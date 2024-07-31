import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";
import { ClearLayoutContext, useStyleContext } from "@/utils/elementContext";
import { IStyleContext, Style } from "@/types/styleTypes";
import { Button } from "../ui/button";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../ui/accordion";
type StyleLayoutProps = {
  style: Style;
  children: React.ReactNode;
};

function StyleLayout({ style, children }: StyleLayoutProps) {
  const { onRemove } = useStyleContext() as IStyleContext;
  const [clearLayout, setClearLayout] = useState(false);
  useEffect(() => {
    if (style.value == "" || style.value == undefined || style.value == null) {
      setClearLayout(true);
    } else {
      setClearLayout(false);
    }
  }, [style.value]);

  const handleRemoveClick = () => {
    onRemove!(style.name);
    setClearLayout(true);
  };
  return (
    <div id={style.name}>
      <Accordion type="single" defaultValue={style.value ? style.name : undefined} collapsible>
        <AccordionItem value={style.name}>
          <Card className="layoutCard">
            <CardHeader
              className={`layoutCardHeader ${
                style.value ? "layoutCardHeaderActive" : "layoutCardHeaderInActive"
              } `}
            >
              <AccordionTrigger className="AccordionTrigger">
                <CardTitle className="layoutCardTitle">
                  {/* <AccordionTrigger className="AccordionTrigger"> */}
                  {style.nameForTitle}
                  {/* </AccordionTrigger> */}

                  <div className="layoutHoverCardHolder">
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="layoutHoverCardTriggerButton"
                        >
                          ?
                        </Button>
                      </HoverCardTrigger>
                      <HoverCardContent className="layoutHoverCardContent">
                        <p className="layoutHoverCardContentDiscription">{style.description}</p>
                      </HoverCardContent>
                    </HoverCard>
                    {style.value && (
                      <Button
                        size="sm"
                        variant={"default"}
                        className="layoutClearButton"
                        onClick={() => handleRemoveClick()}
                      >
                        CLEAR
                      </Button>
                    )}
                  </div>
                </CardTitle>
              </AccordionTrigger>
            </CardHeader>

            <AccordionContent className="AccordionContent">
              <CardContent className="layoutCardContent">
                <ClearLayoutContext.Provider value={clearLayout}>
                  {children}
                </ClearLayoutContext.Provider>
              </CardContent>
            </AccordionContent>
          </Card>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default StyleLayout;
