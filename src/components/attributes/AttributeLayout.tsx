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

function AttributeLayout({ attribute, index, children, onChange, onRemove }: IAttributeContext) {
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
      <Accordion type="single" defaultValue={attribute.name || undefined} collapsible>
        <AccordionItem value={attribute.name}>
          <Card className="layoutCard">
            <CardHeader
              className={`layoutCardHeader ${
                attribute.type == "boolean" ? "rounded-md" : "rounded-t-md"
              } ${
                attribute.value || attribute.type == "boolean"
                  ? "layoutCardHeaderActive"
                  : "layoutCardHeaderInActive"
              } `}
            >
              {attribute.type !== "boolean" ? (
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
                        className="layoutClearButton hover:bg-red-600"
                        onClick={() => handleRemoveClick()}
                      >
                        Clear
                      </Button>
                    </div>
                  </CardTitle>
                </AccordionTrigger>
              ) : (
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
                        <div>
                          <p className="layoutHoverCardContentDiscription">
                            {attribute.description}
                          </p>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                    <Button
                      size="sm"
                      className="layoutClearButton hover:bg-red-600"
                      onClick={() => handleRemoveClick()}
                    >
                      Clear
                    </Button>
                  </div>
                </CardTitle>
              )}
            </CardHeader>
            {attribute.type !== "boolean" && (
              <AccordionContent>
                <CardContent className="layoutCardContent">
                  <AttributeContext.Provider value={{ attribute, index, onChange }}>
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
