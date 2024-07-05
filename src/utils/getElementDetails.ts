import { ElementDetails } from "../types/elementTypes";
import { getCurrentElementText } from "./elementTextContent";
import { getElementPath } from "./getElementPath";

export function getElementDetails(
  element: HTMLElement
): Promise<ElementDetails> {
  return new Promise((resolve, reject) => {
    if (!element) {
      console.error("Element is null");
      reject(new Error("Element is null"));
      return;
    }
    type AttributeValue = string | number;

    function parseAttributeValue(
      attrName: string,
      attrValue: string
    ): [string, AttributeValue] {
      const typeMap: { [key: string]: string } = {
        minlength: "number",
        maxlength: "number",
        low: "number",
        high: "number",
        optimum: "number",
        size: "number",
        start: "number",
        rows: "number",
        cols: "number",
        colspan: "number",
        rowspan: "number",
        span: "number",
      };

      const type = typeMap[attrName.toLowerCase()];

      switch (type) {
        case "number":
          return [attrName, Number(attrValue)];
        default:
          return [attrName, attrValue];
      }
    }

    const details = {
      tagName: element.tagName.toLowerCase(),
      id: element.id,
      className: element.className,
      textContent: getCurrentElementText(element),
      attributes: Object.fromEntries(
        [...element.attributes].map((attr) =>
          parseAttributeValue(attr.name, attr.value)
        )
      ),
      temporaryId: element.getAttribute("data-temporaryid") || null,
      path: getElementPath(element),
    };

    console.log("Element details resolved:", details);
    resolve(details);
  });
}
