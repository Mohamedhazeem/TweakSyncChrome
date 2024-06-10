export function getElementPath(element: HTMLElement) {
  const path = [];
  while (element) {
    let tagName = element.tagName.toLowerCase();
    if (element.id) {
      tagName += `#${element.id}`;
    } else if (element.className) {
      const classes = element.className.split(" ").filter(Boolean);
      if (classes.length > 0) {
        tagName += `.${classes.join(".")}`;
      }
    } else {
      const siblingIndex =
        Array.from(element.parentNode?.children || []).indexOf(element) + 1;
      tagName += `:nth-child(${siblingIndex})`;
    }
    path.unshift(tagName);
    element = element.parentElement as HTMLElement;
  }
  return path.join(" > ");
}
