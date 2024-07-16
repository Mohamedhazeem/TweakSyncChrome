// import { IStyleContext } from "@/types/styleTypes";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";
import { Button } from "../ui/button";
import React from "react";
type StyleLayout = {
  title: string;
  description: string;
  children: React.ReactNode;
};
function StyleLayout({ title, description, children }: StyleLayout) {
  //   const handleRemoveClick = () => {
  //     onRemove!(property);
  //   };
  return (
    <>
      <div id={title}>
        <Card className="border-2">
          <CardHeader className="p-3 pt-1">
            <CardTitle className={"flex justify-between items-center text-xl font-semibold"}>
              {title}
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
                      <p className="text-sm">{description}</p>
                    </div>
                  </HoverCardContent>
                </HoverCard>
                {/* <Button
                  size="sm"
                  className="bg-rose-600 rounded-xl text-xs p-1 w-4 h-4"
                  onClick={() => handleRemoveClick()}
                >
                  X
                </Button> */}
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
