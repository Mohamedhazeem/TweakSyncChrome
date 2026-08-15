/**
 * Animation-frame write scheduler.
 *
 * Producers call `schedule` many times (one per DOM edit); the batched
 * callbacks run in a single `requestAnimationFrame` flush. This is the
 * mechanism behind the content-script write batching required by FR-022 /
 * SC-006. The frame functions are injected so the behaviour is testable
 * without a real animation loop.
 */
export function createFrameScheduler(
  framer: {
    requestAnimationFrame: (cb: FrameRequestCallback) => number;
    cancelAnimationFrame: (handle: number) => void;
  } = typeof requestAnimationFrame !== "undefined"
    ? { requestAnimationFrame, cancelAnimationFrame }
    : { requestAnimationFrame: () => 0, cancelAnimationFrame: () => {} }
) {
  const pending = new Set<() => void>();
  let frameHandle: number | null = null;

  function flush(): void {
    frameHandle = null;
    const tasks = Array.from(pending);
    pending.clear();
    for (const task of tasks) {
      task();
    }
  }

  return {
    schedule(task: () => void): void {
      pending.add(task);
      if (frameHandle === null) {
        frameHandle = framer.requestAnimationFrame(() => flush());
      }
    },
    flush(): void {
      if (frameHandle !== null) {
        framer.cancelAnimationFrame(frameHandle);
        frameHandle = null;
      }
      flush();
    },
    pending(): number {
      return pending.size;
    },
  };
}

export type FrameScheduler = ReturnType<typeof createFrameScheduler>;
