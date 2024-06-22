import ColorStyle from "@/components/ColorStyle";
import { OutletContext } from "@/types/OutletContext";
// import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

function StyleInspector() {
  const { style } = useOutletContext<OutletContext>();
  if (!style) {
    return <div> Not style selected</div>;
  } else {
    return (
      <div className="w-full h-[calc(100vh-65px)] flex items-center justify-center">
        <div className="flex flex-col space-y-4 overflow-y-auto h-full w-full p-4">
          {style && (
            <ColorStyle temporaryId={style.temporaryId} style={style} />
          )}
        </div>
      </div>
    );
  }
}

export default StyleInspector;
