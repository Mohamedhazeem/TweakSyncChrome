import { IAttributeContext } from "@/types/attributeTypes";
import { AttributeContext } from "@/utils/attributesContext";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

function AttributeLayout({
  key,
  attribute,
  index,
  children,
  onChange,
}: IAttributeContext) {
  return (
    <div>
      <Card className="border-2">
        <CardHeader className="p-3">
          <CardTitle className={"text-xl font-semibold"}>
            {attribute.name}
          </CardTitle>
          <CardDescription>{attribute.description}</CardDescription>
        </CardHeader>
        <CardContent className="p-2">
          <AttributeContext.Provider
            value={{ key, attribute, index, onChange }}
          >
            {children}
          </AttributeContext.Provider>
        </CardContent>
      </Card>
    </div>
  );
}

export default AttributeLayout;
