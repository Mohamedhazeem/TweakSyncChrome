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
  return (
    <div>
      <Card className="border-2">
        <CardHeader className="p-3">
          <CardTitle
            className={
              "flex justify-between items-center text-xl font-semibold bg-lime-400"
            }
          >
            {attribute.nameForTitile}
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button
                  variant="outline"
                  size={"sm"}
                  className="bg-slate-400 rounded-xl text-sm p-1 w-6 h-6"
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
