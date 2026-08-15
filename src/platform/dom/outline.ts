import { TWEAKSYNC_ID } from "@/core/element/constants";

export const OUTLINE_CLASS = "selected-outline";

/**
 * A lightweight highlight box drawn over an inspected element. Kept as a class
 * so the side panel can attach/detach it across selection changes without
 * leaking listeners or duplicate nodes.
 */
export class OutlineOverlay {
  private node: HTMLDivElement | null = null;

  constructor(private readonly doc: Document) {}

  attach(target: HTMLElement): void {
    this.detach();

    const node = this.doc.createElement("div");
    node.className = OUTLINE_CLASS;
    node.style.position = "absolute";
    node.style.pointerEvents = "none";
    node.style.width = "0px";
    node.style.height = "0px";
    node.setAttribute(TWEAKSYNC_ID, "outline");

    this.doc.body.appendChild(node);
    this.node = node;

    const rect = target.getBoundingClientRect();
    const offsetParent = this.doc.body;
    node.style.left = `${rect.left + offsetParent.offsetLeft}px`;
    node.style.top = `${rect.top + offsetParent.offsetTop}px`;
    node.style.width = `${rect.width}px`;
    node.style.height = `${rect.height}px`;
  }

  detach(): void {
    if (this.node) {
      this.node.remove();
      this.node = null;
    }
  }
}
