import { IAttributeContext } from "@/types/attributeTypes";
import { AttributeContext } from "@/utils/attributesContext";
import {
  Card,
  CardHeader,
  CardTitle,
  // CardDescription,
  CardContent,
} from "@/components/ui/card";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { Button } from "../ui/button";

function AttributeLayout({
  key,
  attribute,
  index,
  children,
  onChange,
}: IAttributeContext) {
  function handleRemoveClick(): void {
    if (attribute.name === "data-*") {
      onChange(index, {});
    } else {
      onChange(index, "");
    }
    const element = document.getElementById(attribute.name);
    if (element) {
      element.remove();
    }
  }

  return (
    <div id={attribute.name}>
      <Card className="border-2">
        <CardHeader className="p-3">
          <CardTitle
            className={
              "flex justify-between items-center text-xl font-semibold bg-lime-400"
            }
          >
            {attribute.nameForTitile}
            <div className="flex place-items-center gap-1 pr-1">
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button
                    variant="outline"
                    size={"sm"}
                    className="bg-slate-400 rounded-xl text-xs p-1 w-4 h-4"
                  >
                    ?
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-64">
                  <div className="">
                    <p className="text-sm">{attribute.description}</p>
                  </div>
                </HoverCardContent>
              </HoverCard>
              <Button
                size="sm"
                className="bg-rose-600 rounded-xl text-xs p-1 w-4 h-4"
                onClick={() => handleRemoveClick()}
              >
                X
              </Button>
            </div>
          </CardTitle>
          {/* <CardDescription>{attribute.description}</CardDescription> */}
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
