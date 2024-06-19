import ColorStyle from "@/components/ColorStyle";
import { ElementStyles } from "@/types/ElementTypes";
import { useEffect, useState } from "react";

function StyleInspector() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [style, setStyle] = useState<ElementStyles>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleMessage = (message: any) => {
    if (message.action === "showElementStyles") {
      setStyle(undefined);
      setStyle(message.styles);
      //setSelectedTemporaryId(message.details.temporaryId);
      //msg.current!.innerText = JSON.stringify(message.styles, null, 2);
    }
  };

  useEffect(() => {
    // Add listener immediately when component mounts
    chrome.runtime.onMessage.addListener(handleMessage);

    // Clean up listener when component unmounts
    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage);
    };
  }, []);
  return (
    <div>
      {style && <ColorStyle temporaryId={style.temporaryId} style={style} />}
    </div>
  );
}

export default StyleInspector;
