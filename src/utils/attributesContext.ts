import { IAttributeContext } from "@/types/attributeTypes";
import { IStyleContext } from "@/types/styleTypes";
import { createContext, useContext } from "react";

// Create a context with a default value

// Create a context with the Attribute type
export const AttributeContext = createContext<IAttributeContext | undefined>(
  undefined
);
export const StyleContext = createContext<IStyleContext | undefined>(undefined);
// Custom hook for consuming the context
export const useAttributeContext = () => {
  return useContext(AttributeContext);
};
export const useStyleContext = () => {
  return useContext(StyleContext);
};
// export const isAttributeContext = (
//   context: IAttributeContext | IStyleContext | undefined
// ): context is IAttributeContext => {
//   return (context as IAttributeContext)?.attribute !== undefined;
// };

// export const isStyleContext = (
//   context: IAttributeContext | IStyleContext | undefined
// ): context is IStyleContext => {
//   return (context as IStyleContext)?.style !== undefined;
// };
