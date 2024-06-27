import { IAttributeContext } from "@/types/attributeTypes";
import { AttributeContext } from "@/utils/attributesContext";
import {
  Card,
  CardHeader,
  // CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
// import { Button } from "@/components/ui/button";

function AttributeLayout({
  key,
  attribute,
  index,
  children,
  onChange,
}: IAttributeContext) {
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
