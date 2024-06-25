import { Attribute } from "@/types/attributeTypes";
import { AttributeContext } from "@/utils/attributesContext";
import React from "react";

interface IAttributeLayout {
  key: number;
  attribute: Attribute;
  children?: React.ReactNode;
}
{
  /* <LayoutContext.Provider value={props}>
{children}
</LayoutContext.Provider> */
}
function AttributeLayout({ key, attribute, children }: IAttributeLayout) {
  return (
    <AttributeContext.Provider value={{ key, attribute }}>
      {children}
    </AttributeContext.Provider>
  );
}

export default AttributeLayout;
