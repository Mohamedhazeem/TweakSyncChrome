import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";
import { useStyleContext } from "@/utils/elementContext";
import { IStyleContext, Style } from "@/types/styleTypes";
import { Button } from "../ui/button";

type StyleLayoutProps = {
  style: Style;
  children: React.ReactNode;
};

function StyleLayout({ style, children }: StyleLayoutProps) {
  const { onRemove } = useStyleContext() as IStyleContext;
  const handleRemoveClick = () => {
    onRemove!(style.name);
  };
  return (
    <div id={style.name}>
      <Card className="border-1">
        <CardHeader className={`p-2 py-1 rounded ${style.value ? "bg-green-400" : "bg-gray-200"} `}>
          <CardTitle className="flex justify-between items-center text-base font-medium">
            {style.nameForTitle}
            <div className="flex place-items-center gap-1 ">
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-slate-400 rounded-xl text-xs p-1 w-5 h-5"
                  >
                    ?
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-64">
                  <p className="text-sm">{style.description}</p>
                </HoverCardContent>
              </HoverCard>
              {style.value && (
                <Button
                  size="sm"
                  variant={"default"}
                  className="bg-red-500 text-xs p-1 h-5 tracking-wider hover:bg-red-600"
                  onClick={() => handleRemoveClick()}
                >
                  CLEAR
                </Button>
              )}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-2">{children}</CardContent>
      </Card>
    </div>
  );
}

export default StyleLayout;
