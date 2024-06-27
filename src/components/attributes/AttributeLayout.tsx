import { Attribute } from "@/types/attributeTypes";
import { AttributeContext } from "@/utils/attributesContext";
import {
  Card,
  CardHeader,
  // CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import React from "react";
// import { Button } from "@/components/ui/button";

interface IAttributeLayout {
  key: number;
  attribute: Attribute;
  index: number;
  children?: React.ReactNode;
  onChange: (index: number, value: string) => void;
}
{
  /* <LayoutContext.Provider value={props}>
{children}
</LayoutContext.Provider> */
}
function AttributeLayout({
  key,
  attribute,
  index,
  children,
  onChange,
}: IAttributeLayout) {
  return (
    <div>
      <Card className="">
        <CardHeader className="p-3">
          <CardTitle className={"text-xl font-semibold"}>
            {attribute.name}
          </CardTitle>
          <CardDescription>{attribute.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <AttributeContext.Provider
            value={{ key, attribute, index, onChange }}
          >
            {children}
          </AttributeContext.Provider>
        </CardContent>
        {/* <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button>Deploy</Button>
        </CardFooter> */}
      </Card>
    </div>
  );
}

export default AttributeLayout;
