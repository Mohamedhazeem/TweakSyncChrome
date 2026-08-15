import { describe, expect, it } from "vitest";
import { getElementPath } from "@/core/element/elementPath";
import { getCurrentElementText, setCurrentElementText } from "@/core/element/elementText";
import {
  getElementDetails,
  getElementTemporaryId,
  parseAttributeValue,
} from "@/core/element/elementDetails";
import { TEXT_NODE, TWEAKSYNC_ID, TWEAKSYNC_TEMPORARY_ID } from "@/core/element/constants";
import { getElementSpecificAttributes } from "@/core/element/data";

/**
 * These tests deliberately use hand-built element doubles instead of jsdom nodes.
 * If any core/element function reached for a DOM global (`document`, `window`, `Node`)
 * or a browser API, these tests would fail.
 */

type FakeTextNode = { nodeType: number; textContent: string | null };

interface FakeElement {
  tagName: string;
  id: string;
  className: string;
  childNodes: FakeTextNode[];
  attributes: { name: string; value: string }[];
  parentNode: { children: FakeElement[] } | null;
  parentElement: FakeElement | null;
  getAttribute(name: string): string | null;
  appendChild(node: FakeTextNode): FakeTextNode;
  ownerDocument: { createTextNode(data: string): FakeTextNode };
}

function createFakeElement(init: Partial<FakeElement> & { tagName: string }): FakeElement {
  const attributes = init.attributes ?? [];
  const childNodes = init.childNodes ?? [];
  const element: FakeElement = {
    tagName: init.tagName,
    id: init.id ?? "",
    className: init.className ?? "",
    childNodes,
    attributes,
    parentNode: init.parentNode ?? null,
    parentElement: init.parentElement ?? null,
    getAttribute(name: string) {
      const found = attributes.find((attr) => attr.name === name);
      return found ? found.value : null;
    },
    appendChild(node: FakeTextNode) {
      childNodes.push(node);
      return node;
    },
    ownerDocument: {
      createTextNode: (data: string) => ({ nodeType: TEXT_NODE, textContent: data }),
    },
  };
  return element;
}

describe("core/element/elementPath", () => {
  it("uses the id when present", () => {
    const element = createFakeElement({ tagName: "DIV", id: "main" });
    expect(getElementPath(element)).toBe("div#main");
  });

  it("uses class names when there is no id", () => {
    const element = createFakeElement({ tagName: "SPAN", className: "alpha beta" });
    expect(getElementPath(element)).toBe("span.alpha.beta");
  });

  it("falls back to nth-child when there is no id or class", () => {
    const first = createFakeElement({ tagName: "LI" });
    const second = createFakeElement({ tagName: "LI" });
    const parent = createFakeElement({ tagName: "UL", id: "list" });
    parent.parentNode = null;
    const siblings = { children: [first, second] };
    first.parentNode = siblings;
    second.parentNode = siblings;
    second.parentElement = parent;

    expect(getElementPath(second)).toBe("ul#list > li:nth-child(2)");
  });

  it("walks ancestors and joins them with ' > '", () => {
    const root = createFakeElement({ tagName: "BODY", className: "page" });
    const middle = createFakeElement({ tagName: "SECTION", id: "hero", parentElement: root });
    const leaf = createFakeElement({ tagName: "P", className: "copy", parentElement: middle });

    expect(getElementPath(leaf)).toBe("body.page > section#hero > p.copy");
  });

  it("returns an empty path for a missing element", () => {
    expect(getElementPath(null)).toBe("");
  });
});

describe("core/element/elementText", () => {
  it("concatenates trimmed direct text nodes only", () => {
    const element = createFakeElement({
      tagName: "P",
      childNodes: [
        { nodeType: TEXT_NODE, textContent: "  Hello " },
        { nodeType: 1, textContent: "ignored element" },
        { nodeType: TEXT_NODE, textContent: "World  " },
      ],
    });

    expect(getCurrentElementText(element)).toBe("HelloWorld");
  });

  it("updates the first existing text node", () => {
    const element = createFakeElement({
      tagName: "P",
      childNodes: [{ nodeType: TEXT_NODE, textContent: "old" }],
    });

    setCurrentElementText(element, "new");

    expect(element.childNodes[0].textContent).toBe("new");
    expect(element.childNodes).toHaveLength(1);
  });

  it("creates a text node through the owner document when none exists", () => {
    const element = createFakeElement({ tagName: "P" });

    setCurrentElementText(element, "fresh");

    expect(element.childNodes).toHaveLength(1);
    expect(element.childNodes[0].textContent).toBe("fresh");
  });

  it("ignores a missing element", () => {
    expect(() => setCurrentElementText(undefined, "noop")).not.toThrow();
  });
});

describe("core/element/elementDetails", () => {
  it("coerces numeric attributes and leaves others as strings", () => {
    expect(parseAttributeValue("rows", "4")).toEqual(["rows", 4]);
    expect(parseAttributeValue("COLSPAN", "2")).toEqual(["COLSPAN", 2]);
    expect(parseAttributeValue("title", "4")).toEqual(["title", "4"]);
  });

  it("resolves the full detail payload", async () => {
    const element = createFakeElement({
      tagName: "INPUT",
      id: "email",
      className: "field required",
      attributes: [
        { name: "id", value: "email" },
        { name: "size", value: "20" },
        { name: TWEAKSYNC_ID, value: "abc123" },
      ],
      childNodes: [{ nodeType: TEXT_NODE, textContent: " label " }],
    });

    const details = await getElementDetails(element);

    expect(details.tagName).toBe("input");
    expect(details.id).toBe("email");
    expect(details.className).toBe("field required");
    expect(details.textContent).toBe("label");
    expect(details.attributes).toEqual({ id: "email", size: 20, [TWEAKSYNC_ID]: "abc123" });
    expect(details.temporaryId).toBe("abc123");
    expect(details.path).toBe("input#email");
  });

  it("rejects when the element is missing", async () => {
    await expect(getElementDetails(null)).rejects.toThrow("Element is null");
    await expect(getElementTemporaryId(null)).rejects.toThrow("Element is null");
  });

  it("reads the temporary id fallback attribute", async () => {
    const element = createFakeElement({
      tagName: "DIV",
      attributes: [{ name: TWEAKSYNC_TEMPORARY_ID, value: "tmp-9" }],
      childNodes: [{ nodeType: TEXT_NODE, textContent: "text" }],
    });

    const details = await getElementTemporaryId(element);

    expect(details).toEqual({ temporaryId: "tmp-9", textContent: "text" });
  });
});

describe("core/element/data", () => {
  it("resolves element specific attributes in O(1) by tag name", () => {
    const areaAttributes = getElementSpecificAttributes("area");
    expect(Array.isArray(areaAttributes)).toBe(true);
    expect(areaAttributes.length).toBeGreaterThan(0);
    expect(getElementSpecificAttributes("AREA")).toEqual(areaAttributes);
    expect(getElementSpecificAttributes("not-a-tag")).toBeUndefined();
  });
});
