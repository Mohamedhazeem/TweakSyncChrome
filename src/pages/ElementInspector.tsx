import PTag from "@/components/P_Tag";
import { ElementDetails } from "@/types/ElementTypes";
import { useEffect, useState } from "react";

function ElementInspector() {
  const [element, setTag] = useState<ElementDetails>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleMessage = (message: any) => {
    if (message.action === "showElementDetails") {
      setTag(undefined);
      setTag(message.details);
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
      <PTag tag={element} />
    </div>
  );
}

export default ElementInspector;
