import { IAttributeContext } from "@/types/attributeTypes";
import { createContext, useContext } from "react";

// Create a context with a default value

// Create a context with the Attribute type
export const AttributeContext = createContext<IAttributeContext | undefined>(
  undefined
);

// Custom hook for consuming the context
export const useAttributeContext = () => {
  return useContext(AttributeContext);
};
