import { describe, expect, it } from "vitest";
import { applyStyleUpdate } from "@/platform/dom/styleWriter";
import { getCachedRules, invalidateRuleCache } from "@/platform/dom/ruleCache";
import { createFrameScheduler } from "@/platform/dom/scheduler";
import { TWEAKSYNC_ID } from "@/core/element/constants";

/**
 * T048 — performance profile on a 1000+ element page.
 *
 * Asserts the two properties the refactor's acceptance criteria require:
 *   1. Style application is O(n): a stylesheet rule edit is O(rules) (Map
 *      lookups), independent of how many elements match it; inline edits cost
 *      O(1) each, so editing k elements is O(k).
 *   2. DOM writes are flushed once per frame: N scheduled writes coalesce into
 *      a single `requestAnimationFrame` flush.
 *
 * Timings are measured in jsdom (logic cost, no layout/paint) and logged as a
 * baseline; the hard assertions verify algorithmic shape, not wall-clock.
 */

const PAGE = 1200; // a 1000+ element page, per SC-005
const RULE_SIZES = [250, 500, 1000, 2000] as const; // elements carrying `.card`
const EDIT_COUNTS = [100, 300, 600, 1200] as const; // # of inline elements edited

function buildPage(count: number): void {
  invalidateRuleCache();
  document.head.innerHTML = "";
  document.body.innerHTML = "";
  const style = document.createElement("style");
  style.textContent = ".card { color: red; } .pill { color: green; }";
  document.head.appendChild(style);

  const parts: string[] = [];
  for (let i = 0; i < count; i += 1) {
    const extra = i % 2 === 0 ? " pill" : "";
    parts.push(`<div class="card${extra}" ${TWEAKSYNC_ID}="el-${i}"></div>`);
  }
  document.body.innerHTML = parts.join("");
}

/** Per-call cost: times `calls` invocations per block, returns the best block / calls. */
function timePerCall(fn: () => void, calls: number, reps = 5): number {
  for (let i = 0; i < calls; i += 1) fn(); // warmup
  let best = Infinity;
  for (let r = 0; r < reps; r += 1) {
    const start = performance.now();
    for (let i = 0; i < calls; i += 1) fn();
    const elapsed = performance.now() - start;
    if (elapsed < best) best = elapsed;
  }
  return best / calls;
}

describe("T048 — O(n) style application on large pages", () => {
  it("edits a stylesheet rule in O(rules), independent of matched-element count", () => {
    const ruleTimes: number[] = [];

    for (const size of RULE_SIZES) {
      buildPage(size);
      const edit = () =>
        applyStyleUpdate(document, {
          selector: ".card",
          property: "color",
          newStyleValue: "blue",
          temporaryId: "unused",
        });
      ruleTimes.push(timePerCall(edit, 200));

      // The rule was resolved through the Map index and updated; the cost does
      // not scale with the 250/500/1000/2000 elements that carry `.card`.
      expect(getCachedRules(document).get(".card")?.[0].style.getPropertyValue("color")).toBe(
        "blue"
      );
    }

    const ratio = Math.max(...ruleTimes) / Math.min(...ruleTimes);
    console.log("[T048 baseline] per stylesheet-rule edit (ms, 200 calls):");
    RULE_SIZES.forEach((size, i) => console.log(`  ${size} matched elements: ${ruleTimes[i].toFixed(5)} ms`));
    console.log(`  slowest/fastest ratio: ${ratio.toFixed(2)}x (O(1) wrt elements)`);

    // Independent of element count => ratio stays bounded.
    expect(ratio).toBeLessThan(3);
  });

  it(
    "applies inline edits in O(n) — cost grows with edited elements, not page size",
    () => {
      buildPage(PAGE);
      const inlineTimes: Record<number, number> = {};
      const editK = (k: number) => () => {
        for (let i = 0; i < k; i += 1) {
          applyStyleUpdate(document, {
            selector: "inline",
            property: "color",
            newStyleValue: "blue",
            temporaryId: `el-${i}`,
          });
        }
      };

      for (const k of EDIT_COUNTS) {
        inlineTimes[k] = timePerCall(editK(k), 1, 1);
      }

      console.log(`[T048 baseline] inline edits on a ${PAGE}-element page (ms, 1 run):`);
      for (const k of EDIT_COUNTS) {
        console.log(`  ${k} elements edited: ${inlineTimes[k].toFixed(4)} ms`);
      }

      // Editing k elements costs ~k * O(1); must be monotonic in k.
      expect(inlineTimes[1200]).toBeGreaterThan(inlineTimes[600]);
      expect(inlineTimes[600]).toBeGreaterThan(inlineTimes[100]);
    },
    60000
  );

  it("flushes N scheduled DOM writes in a single animation frame", () => {
    const frames: FrameRequestCallback[] = [];
    const scheduler = createFrameScheduler({
      requestAnimationFrame: (cb: FrameRequestCallback) => {
        frames.push(cb);
        return frames.length;
      },
      cancelAnimationFrame: () => {},
    });

    const N = 1000;
    let executed = 0;
    for (let i = 0; i < N; i += 1) {
      scheduler.schedule(() => {
        executed += 1;
      });
    }

    // All N writes queued before any flush => exactly one rAF, one frame.
    expect(frames).toHaveLength(1);
    expect(scheduler.pending()).toBe(N);

    frames[0](0);
    expect(executed).toBe(N);
    expect(scheduler.pending()).toBe(0);
  });
});
