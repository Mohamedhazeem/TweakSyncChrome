import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getCachedRules, invalidateRuleCache } from "@/platform/dom/ruleCache";
import { addSelector, renameSelector } from "@/platform/dom/selectorSheet";
import { findByTemporaryId, getCachedElement } from "@/platform/dom/elementCache";
import { applyStyleUpdate } from "@/platform/dom/styleWriter";
import { collectElementStyles } from "@/platform/dom/styleCollector";
import { updateElementText } from "@/platform/dom/textWriter";
import { updateElementAttributes } from "@/platform/dom/attributeWriter";
import { createFrameScheduler } from "@/platform/dom/scheduler";
import { debounce } from "@/platform/dom/throttle";
import { OutlineOverlay } from "@/platform/dom/outline";
import { TWEAKSYNC_ID } from "@/core/element/constants";

function mountStyles(css: string): void {
  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);
}

beforeEach(() => {
  document.head.innerHTML = "";
  document.body.innerHTML = "";
  invalidateRuleCache();
});

afterEach(() => {
  vi.useRealTimers();
});

describe("platform/dom/ruleCache", () => {
  it("indexes rules by selector in a Map for O(1) access", () => {
    mountStyles(".card { color: red; } #hero { display: flex; }");

    const rules = getCachedRules(document);

    expect(rules).toBeInstanceOf(Map);
    expect(rules.get(".card")?.[0].style.getPropertyValue("color")).toBe("red");
    expect(rules.get("#hero")).toHaveLength(1);
  });

  it("rebuilds the index on each call so late stylesheets are visible", () => {
    mountStyles(".a { color: red; }");
    expect(getCachedRules(document).has(".b")).toBe(false);

    mountStyles(".b { color: blue; }");
    expect(getCachedRules(document).has(".b")).toBe(true);
  });
});

describe("platform/dom/selectorSheet", () => {
  it("adds a missing selector and registers it in the cache", () => {
    mountStyles(".existing { color: red; }");
    getCachedRules(document);

    addSelector(document, ".brand-new");

    expect(getCachedRules(document).has(".brand-new")).toBe(true);
  });

  it("does not duplicate an existing selector", () => {
    mountStyles(".dupe { color: red; }");

    addSelector(document, ".dupe");

    const sheet = document.querySelector("style")!.sheet!;
    const matches = Array.from(sheet.cssRules).filter(
      (rule) => (rule as CSSStyleRule).selectorText === ".dupe"
    );
    expect(matches).toHaveLength(1);
  });

  it("renames a selector while preserving its declarations", () => {
    mountStyles(".old { color: red; }");

    renameSelector(document, ".old", ".new");

    const rules = getCachedRules(document);
    expect(rules.has(".old")).toBe(false);
    expect(rules.get(".new")?.[0].style.getPropertyValue("color")).toBe("red");
  });

  it("ignores renames of unknown selectors", () => {
    mountStyles(".only { color: red; }");
    expect(() => renameSelector(document, ".missing", ".other")).not.toThrow();
  });
});

describe("platform/dom/elementCache", () => {
  it("finds an element by either temporary id attribute", () => {
    document.body.innerHTML = `<div ${TWEAKSYNC_ID}="a1"></div><span data-tweaksync-temporaryid="b2"></span>`;

    expect(findByTemporaryId(document, "a1")?.tagName).toBe("DIV");
    expect(findByTemporaryId(document, "b2")?.tagName).toBe("SPAN");
    expect(findByTemporaryId(document, "nope")).toBeNull();
  });

  it("memoises the lookup", () => {
    document.body.innerHTML = `<div ${TWEAKSYNC_ID}="a1"></div>`;
    const resolve = getCachedElement({ temporaryId: "a1" }, document);
    const first = resolve();
    document.body.innerHTML = "";
    expect(resolve()).toBe(first);
  });
});

describe("platform/dom/styleWriter", () => {
  it("writes inline styles by temporary id", () => {
    document.body.innerHTML = `<div ${TWEAKSYNC_ID}="a1" style="color: red"></div>`;

    applyStyleUpdate(document, {
      selector: "inline",
      property: "display",
      newStyleValue: "flex",
      temporaryId: "a1",
    });

    const element = document.querySelector<HTMLElement>(`[${TWEAKSYNC_ID}="a1"]`)!;
    expect(element.style.getPropertyValue("display")).toBe("flex");
    expect(element.style.getPropertyValue("color")).toBe("red");
  });

  it("writes stylesheet rules through the selector index", () => {
    mountStyles(".card { color: red; }");

    applyStyleUpdate(document, {
      selector: ".card",
      property: "color",
      newStyleValue: "blue",
      temporaryId: "a1",
    });

    expect(getCachedRules(document).get(".card")?.[0].style.getPropertyValue("color")).toBe("blue");
  });

  it("ignores updates without a selector or property", () => {
    expect(() =>
      applyStyleUpdate(document, { selector: "", property: "", temporaryId: "a1" })
    ).not.toThrow();
  });
});

describe("platform/dom/styleCollector", () => {
  it("collects inline and external styles for an injected element", async () => {
    mountStyles(".card { color: red; } #hero { display: flex; }");
    document.body.innerHTML = `<div id="hero" class="card" ${TWEAKSYNC_ID}="a1" style="opacity: 0.5"></div>`;
    const element = document.querySelector<HTMLElement>("#hero")!;

    const styles = await collectElementStyles(element, document);

    expect(styles.inline.opacity).toBe("0.5");
    expect(styles.external.classes[".card"].color).toBe("red");
    expect(styles.external.ids["#hero"].display).toBe("flex");
    expect(styles.temporaryId).toBe("a1");
  });
});

describe("platform/dom/textWriter", () => {
  it("updates the text of the element addressed by temporary id", () => {
    document.body.innerHTML = `<p ${TWEAKSYNC_ID}="a1">old</p>`;

    updateElementText(document, { temporaryId: "a1", text: "new" });

    expect(document.querySelector("p")!.textContent).toBe("new");
  });

  it("does nothing when the element is missing", () => {
    expect(() => updateElementText(document, { temporaryId: "gone", text: "x" })).not.toThrow();
  });
});

describe("platform/dom/attributeWriter", () => {
  it("sets and removes plain attributes", () => {
    document.body.innerHTML = `<input />`;
    const element = document.querySelector<HTMLElement>("input")!;

    updateElementAttributes(element, { name: "placeholder", value: "hi" });
    expect(element.getAttribute("placeholder")).toBe("hi");

    updateElementAttributes(element, { name: "placeholder", value: "" });
    expect(element.hasAttribute("placeholder")).toBe(false);
  });

  it("synchronises the data-* attribute set and keeps the tweaksync id", () => {
    document.body.innerHTML = `<div data-a="1" data-b="2" ${TWEAKSYNC_ID}="keep"></div>`;
    const element = document.querySelector<HTMLElement>("div")!;

    updateElementAttributes(element, { name: "data-*", value: { "data-a": "9" } });

    expect(element.getAttribute("data-a")).toBe("9");
    expect(element.hasAttribute("data-b")).toBe(false);
    expect(element.getAttribute(TWEAKSYNC_ID)).toBe("keep");
  });
});

describe("platform/dom/scheduler", () => {
  it("batches writes into a single animation frame flush", () => {
    const frames: FrameRequestCallback[] = [];
    const scheduler = createFrameScheduler({
      requestAnimationFrame: (cb: FrameRequestCallback) => {
        frames.push(cb);
        return frames.length;
      },
      cancelAnimationFrame: () => {},
    });

    const order: string[] = [];
    scheduler.schedule(() => order.push("a"));
    scheduler.schedule(() => order.push("b"));

    expect(frames).toHaveLength(1);
    expect(order).toEqual([]);

    frames[0](0);

    expect(order).toEqual(["a", "b"]);
    expect(scheduler.pending()).toBe(0);
  });

  it("flushes synchronously on demand", () => {
    const scheduler = createFrameScheduler({
      requestAnimationFrame: () => 1,
      cancelAnimationFrame: () => {},
    });
    const order: string[] = [];
    scheduler.schedule(() => order.push("a"));
    scheduler.flush();
    expect(order).toEqual(["a"]);
  });
});

describe("platform/dom/throttle", () => {
  it("debounces repeated calls", () => {
    vi.useFakeTimers();
    const spy = vi.fn();
    const debounced = debounce(spy, 50);

    debounced();
    debounced();
    vi.advanceTimersByTime(49);
    expect(spy).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});

describe("platform/dom/outline", () => {
  it("creates, positions and removes the outline overlay", () => {
    const overlay = new OutlineOverlay(document);
    document.body.innerHTML = `<div id="target"></div>`;
    const target = document.querySelector<HTMLElement>("#target")!;

    overlay.attach(target);
    const node = document.querySelector<HTMLElement>(".selected-outline");
    expect(node).not.toBeNull();
    expect(node!.style.width).toBe("0px");

    overlay.detach();
    expect(document.querySelector(".selected-outline")).toBeNull();
  });
});
