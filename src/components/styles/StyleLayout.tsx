// import { IStyleContext } from "@/types/styleTypes";
// import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
// import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";
// import { Button } from "../ui/button";
// import React from "react";
// import { useStyleContext } from "@/utils/elementContext";
// import { IStyleContext, Style } from "@/types/styleTypes";
// type StyleLayout = {
//   style: Style;
//   // title: string;
//   // description: string;
//   children: React.ReactNode;
// };
// function StyleLayout({ style, children }: StyleLayout) {
//   const { onRemove } = useStyleContext() as IStyleContext;
// const handleRemoveClick = () => {
//   onRemove!(style.name);
// };
//   return (
//     <>
//       <div id={style.name}>
//         <Card className="border-2">
//           <CardHeader className="p-3 pt-1">
//             <CardTitle className={"flex justify-between items-center text-xl font-semibold"}>
//               {style.nameForTitle}
//               <div className="flex place-items-center gap-1 pr-1">
//                 <HoverCard>
//                   <HoverCardTrigger asChild>
//                     <Button
//                       variant="outline"
//                       size={"sm"}
//                       className="bg-slate-400 rounded-xl text-xs p-1 w-4 h-4"
//                     >
//                       ?
//                     </Button>
//                   </HoverCardTrigger>
//                   <HoverCardContent className="w-64">
//                     <div className="">
//                       <p className="text-sm">{style.description}</p>
//                     </div>
//                   </HoverCardContent>
//                 </HoverCard>
//                 <Button
//                   size="sm"
//                   className="bg-rose-600 rounded-xl text-xs p-1 w-4 h-4"
//                   onClick={() => handleRemoveClick()}
//                 >
//                   X
//                 </Button>
//               </div>
//             </CardTitle>
//             {/* <CardDescription>{attribute.description}</CardDescription> */}
//           </CardHeader>
//           {<CardContent className="p-2">{children}</CardContent>}
//         </Card>
//       </div>
//     </>
//   );
// }

// export default StyleLayout;
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";

import React from "react";
import { useStyleContext } from "@/utils/elementContext";
import { IStyleContext, Style } from "@/types/styleTypes";
import { Button } from "../ui/button";

type StyleLayoutProps = {
  style: Style;
  children: React.ReactNode;
};

function StyleLayout({ style, children }: StyleLayoutProps) {
  const { onRemove } = useStyleContext() as IStyleContext;
  // const handleCheckboxChange = (checked: boolean | "indeterminate") => {
  //   if (checked === true) {
  //     onChange(selector, style.name, style.value || "");
  //   } else {
  //     onRemove!(style.name);
  //   }
  //   setIsChecked(checked === true);
  // };
  const handleRemoveClick = () => {
    onRemove!(style.name);
  };
  return (
    <div id={style.name}>
      <Card className="border-1">
        <CardHeader className={`p-2 py-1 rounded ${style.value ? "bg-green-400" : "bg-gray-200"} `}>
          <CardTitle className="flex justify-between items-center text-xl font-semibold">
            {style.nameForTitle}
            <div className="flex place-items-center gap-1 ">
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-slate-400 rounded-xl text-xs p-1 w-4 h-4"
                  >
                    ?
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-64">
                  <p className="text-sm">{style.description}</p>
                </HoverCardContent>
              </HoverCard>
              <Button
                size="sm"
                variant={"default"}
                className="bg-rose-400 text-xs h-5 tracking-wider hover:bg-rose-600"
                onClick={() => handleRemoveClick()}
              >
                CLEAR
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-2">{children}</CardContent>
      </Card>
    </div>
  );
}

export default StyleLayout;
