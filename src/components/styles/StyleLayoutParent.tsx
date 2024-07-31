import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { StyleContext } from "@/utils/elementContext";
import StyleFactory from "./StyleFactory";
import { StyleGroup } from "@/types/styleTypes";
import { ElementStyles } from "@/types/elementTypes";
import AddStyleProperty from "./styleHelperComponents/AddStyleProperty";
import { Button } from "../ui/button";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../ui/accordion";

type StyleLayoutParentProps = {
  selector: string;
  groupedProperties: { [groupName: string]: StyleGroup };
  setStyles: React.Dispatch<React.SetStateAction<ElementStyles>>;
  addProperty: (selector: string, property: string) => void;
  handleStyleChange: (selector: string, property: string, newValue: string | null) => void;
  onClear: (selector: string, property: string) => void;
};

const StyleLayoutParent: React.FC<StyleLayoutParentProps> = ({
  selector,
  groupedProperties,
  setStyles,
  addProperty,
  handleStyleChange,
  onClear,
}) => {
  const handleClearGroup = (group: StyleGroup) => {
    group.propertyNames.forEach((property) => {
      handleStyleChange(selector, property, null);
      onClear(selector, property);
    });
  };

  return (
    <div key={selector}>
      <Card className="layoutCard">
        <CardHeader className="layoutParentCardHeader">
          <CardTitle className="layoutParentCardTitle">{selector}</CardTitle>
        </CardHeader>
        <CardContent className="layoutParentCardContent">
          {Object.entries(groupedProperties).map(([groupName, group]) => (
            <div key={`${selector}-${groupName}`}>
              <Accordion
                type="multiple"
                defaultValue={
                  group.groups.some((style) => style.value) ? [`${selector}-${groupName}`] : []
                }
              >
                <AccordionItem value={`${selector}-${groupName}`}>
                  <CardHeader className={"layoutParentCardContentHeader"}>
                    <AccordionTrigger className="AccordionTrigger">
                      <CardTitle className="layoutParentCardContentTitle">
                        {groupName}
                        <Button
                          size="sm"
                          variant={"default"}
                          className="layoutClearButton"
                          onClick={() => handleClearGroup(group)}
                        >
                          Remove
                        </Button>
                      </CardTitle>
                    </AccordionTrigger>
                  </CardHeader>
                  <StyleContext.Provider
                    value={{
                      key: `${selector}-${groupName}`,
                      name: groupName,
                      selector,
                      group,
                      onRemove: (property: string) => handleStyleChange(selector, property, null),
                      onChange: handleStyleChange,
                    }}
                  >
                    <AccordionContent className="AccordionContent">
                      <StyleFactory name={groupName} />
                    </AccordionContent>
                  </StyleContext.Provider>
                </AccordionItem>
              </Accordion>
            </div>
          ))}
          <AddStyleProperty
            selector={selector}
            setStyles={setStyles}
            addStyleProperty={addProperty}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default StyleLayoutParent;
