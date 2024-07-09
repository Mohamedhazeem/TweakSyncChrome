// import { IStyleContext } from "@/types/styleTypes";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { Button } from "../ui/button";
import { useStyleContext } from "@/utils/attributesContext";
import React from "react";
import { IStyleContext } from "@/types/styleTypes";
type StyleLayout = {
  children: React.ReactNode;
};
function StyleLayout({ children }: StyleLayout) {
  const { name, style, onRemove, property } =
    useStyleContext() as IStyleContext;

  const handleRemoveClick = () => {
    onRemove!(property);
  };
  return (
    <>
      <div id={name}>
        <Card className="border-2">
          <CardHeader className="p-3 pt-1">
            <CardTitle
              className={
                "flex justify-between items-center text-xl font-semibold"
              }
            >
              {style?.nameForTitle || name}
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
                      <p className="text-sm">{style?.description}</p>
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
          {<CardContent className="p-2">{children}</CardContent>}
        </Card>
      </div>
    </>
  );
}

export default StyleLayout;
