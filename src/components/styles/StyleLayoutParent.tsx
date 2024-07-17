import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { StyleContext } from "@/utils/elementContext";
import StyleFactory from "./StyleFactory";
import { StyleGroup } from "@/types/styleTypes";
import { ElementStyles } from "@/types/elementTypes";
import AddStyleProperty from "./styleHelperComponents/AddStyleProperty";

type StyleLayoutParentProps = {
  selector: string;
  groupedProperties: { [groupName: string]: StyleGroup };
  setStyles: React.Dispatch<React.SetStateAction<ElementStyles>>;
  addProperty: (selector: string, property: string) => void;
  handleStyleChange: (selector: string, property: string, newValue: string | null) => void;
};

const StyleLayoutParent: React.FC<StyleLayoutParentProps> = ({
  selector,
  groupedProperties,
  setStyles,
  addProperty,
  handleStyleChange,
}) => {
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
                <CardTitle className="text-center text-base font-semibold">{groupName}</CardTitle>
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
