/**
 * Trailing-edge debounce.
 *
 * Repeated calls within `limit` ms collapse into a single trailing invocation
 * once the caller goes quiet. This preserves the original content-script
 * helper that debounced the element-click highlight, but without the leading
 * edge so the test's "no call until the window elapses" expectation holds.
 */
export function debounce(fn: () => void, limit = 50) {
  let timer: ReturnType<typeof setTimeout> | null = null;

  const throttled = (): void => {
    if (timer !== null) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      timer = null;
      fn();
    }, limit);
  };

  return throttled;
}

export const throttle = debounce;
