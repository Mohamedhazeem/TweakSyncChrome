import { IAttributeContext } from "@/types/attributeTypes";
import { IStyleContext } from "@/types/styleTypes";
import { createContext, useContext } from "react";

// Create a context with a default value

// Create a context with the Attribute type
export const AttributeContext = createContext<IAttributeContext | undefined>(undefined);
export const StyleContext = createContext<IStyleContext | undefined>(undefined);
export const ClearLayoutContext = createContext<boolean>(false);
// Custom hook for consuming the context
export const useAttributeContext = () => {
  return useContext(AttributeContext);
};
export const useStyleContext = () => {
  return useContext(StyleContext);
};
export const useClearLayoutContext = () => {
  return useContext(ClearLayoutContext);
};
