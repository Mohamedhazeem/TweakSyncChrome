import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { StyleContext } from "@/utils/elementContext";
import StyleFactory from "./StyleFactory";
import { StyleGroup } from "@/types/styleTypes";
import { ElementStyles } from "@/types/elementTypes";
import AddStyleProperty from "./styleHelperComponents/AddStyleProperty";
import { Button } from "../ui/button";

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
      <Card className="border-2">
        <CardHeader className="p-1 bg-violet-400">
          <CardTitle className="text-lg font-semibold">{selector}</CardTitle>
        </CardHeader>
        <CardContent className="p-2 m-0 flex flex-col gap-2">
          {Object.entries(groupedProperties).map(([groupName, group]) => (
            <React.Fragment key={`${selector}-${groupName}`}>
              <CardHeader className={`p-2 py-1 rounded bg-blue-400`}>
                <CardTitle className="text-base font-semibold flex justify-between items-center">
                  {groupName}
                  <Button
                    size="sm"
                    variant={"default"}
                    className="bg-red-500 text-xs p-1 h-5 tracking-wider hover:bg-red-600"
                    onClick={() => handleClearGroup(group)}
                  >
                    CLEAR
                  </Button>
                </CardTitle>
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
                <StyleFactory name={groupName} />
              </StyleContext.Provider>
            </React.Fragment>
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
