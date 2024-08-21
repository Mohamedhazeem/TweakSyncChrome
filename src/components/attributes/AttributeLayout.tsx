import { IAttributeContext } from "@/types/attributeTypes";
import { AttributeContext } from "@/utils/elementContext";
import {
  Card,
  CardHeader,
  CardTitle,
  // CardDescription,
  CardContent,
} from "@/components/ui/card";

import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";
import { Button } from "../ui/button";

function AttributeLayout({
  key,
  attribute,
  index,
  children,
  onChange,
  onRemove,
}: IAttributeContext) {
  function handleRemoveClick(): void {
    if (attribute.name === "data-*") {
      onChange(index, {});
    } else {
      onRemove!(attribute.name);
    }
    const element = document.getElementById(attribute.name);
    if (element) {
      element.remove();
    }
  }

  return (
    <div id={attribute.name}>
      <Card className="layoutCard">
        <CardHeader
          className={`layoutCardHeader rounded-t-md ${
            attribute.value ? "layoutCardHeaderActive" : "layoutCardHeaderInActive"
          } `}
        >
          <CardTitle className="layoutCardTitle">
            {attribute.nameForTitle}
            <div className="layoutHoverCardHolder">
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button variant="outline" size={"sm"} className="layoutHoverCardTriggerButton">
                    ?
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent className="layoutHoverCardContent">
                  <div className="">
                    <p className="layoutHoverCardContentDiscription">{attribute.description}</p>
                  </div>
                </HoverCardContent>
              </HoverCard>
              <Button size="sm" className="layoutClearButton" onClick={() => handleRemoveClick()}>
                Clear
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        {attribute.type !== "boolean" && (
          <CardContent className="layoutCardContent">
            <AttributeContext.Provider value={{ key, attribute, index, onChange }}>
              {children}
            </AttributeContext.Provider>
          </CardContent>
        )}
      </Card>
    </div>
  );
}

export default AttributeLayout;
