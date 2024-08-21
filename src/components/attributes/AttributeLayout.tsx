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
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../ui/accordion";
import { useState } from "react";

function AttributeLayout({
  key,
  attribute,
  index,
  children,
  onChange,
  onRemove,
}: IAttributeContext) {
  const [isOpen, setIsOpen] = useState(attribute.value ? attribute.name : undefined);

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
      <Accordion
        type="single"
        defaultValue={attribute.value ? attribute.name : undefined}
        collapsible
        onValueChange={(value) => setIsOpen(value)}
      >
        <AccordionItem value={attribute.name}>
          <Card className="layoutCard">
            <CardHeader
              className={`layoutCardHeader ${isOpen ? "rounded-t-md" : "rounded-md"} ${
                attribute.value ? "layoutCardHeaderActive" : "layoutCardHeaderInActive"
              } `}
            >
              <AccordionTrigger className="AccordionTrigger">
                <CardTitle className="layoutCardTitle">
                  {attribute.nameForTitle}
                  <div className="layoutHoverCardHolder">
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <Button
                          variant="outline"
                          size={"sm"}
                          className="layoutHoverCardTriggerButton"
                        >
                          ?
                        </Button>
                      </HoverCardTrigger>
                      <HoverCardContent className="layoutHoverCardContent">
                        <div className="">
                          <p className="layoutHoverCardContentDiscription">
                            {attribute.description}
                          </p>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                    <Button
                      size="sm"
                      className="layoutClearButton"
                      onClick={() => handleRemoveClick()}
                    >
                      Clear
                    </Button>
                  </div>
                </CardTitle>
              </AccordionTrigger>
            </CardHeader>
            {attribute.type !== "boolean" && (
              <AccordionContent>
                <CardContent className="layoutCardContent">
                  <AttributeContext.Provider value={{ key, attribute, index, onChange }}>
                    {children}
                  </AttributeContext.Provider>
                </CardContent>
              </AccordionContent>
            )}
          </Card>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default AttributeLayout;
