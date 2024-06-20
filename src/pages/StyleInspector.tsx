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
      <div>
        {style && <ColorStyle temporaryId={style.temporaryId} style={style} />}
      </div>
    );
  }
}

export default StyleInspector;
