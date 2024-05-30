import { useState, useEffect, useRef } from "react";
import "./App.css";
import { ElementDetails, ElementStyles } from "./types/ElementTypes";
import PTag from "./components/P_Tag";
import ColorStyle from "./components/ColorStyle";

function App() {
  const [receivedMessage, setReceivedMessage] = useState("");
  const [element, setTag] = useState<ElementDetails>();
  const [style, setStyle] = useState<ElementStyles>();
  const msg = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleMessage = (message: any) => {
    if (message.action === "receivedMessage") {
      setReceivedMessage(message.data);
      msg.current!.innerText = message.data;
    }
    if (message.action === "showElementDetails") {
      setTag(undefined);
      setTag(message.details);
      //setSelectedTemporaryId(message.details.temporaryId);
      //msg.current!.innerText = JSON.stringify(message.details, null, 2);
    }
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

  async function connected() {
    console.log("initWebSocket");
    await chrome.runtime.sendMessage({ action: "connect" });
  }
  async function refresh() {
    await chrome.runtime.sendMessage({ action: "refresh" });
    console.log(receivedMessage);
  }
  function inject() {
    chrome.runtime.sendMessage({ action: "injectContent" });
  }
  function removeInject() {
    chrome.runtime.sendMessage({ action: "resetContentScriptInjected" });
  }
  function applyElement() {
    chrome.runtime.sendMessage({ action: "apply", apply: "element" });
  }
  function applyStyles() {
    chrome.runtime.sendMessage({ action: "apply", apply: "styles" });
  }

  return (
    <div className="box">
      <button type="button" id="connect" onClick={connected}>
        Connect
      </button>
      <button type="button" id="refresh" onClick={refresh}>
        Refresh
      </button>

      <button type="button" id="inject" onClick={inject}>
        Inject
      </button>
      <button type="button" id="remove_inject" onClick={removeInject}>
        Remove Inject
      </button>
      <button type="button" id="applyElement" onClick={applyElement}>
        Apply Element
      </button>
      <button type="button" id="applyStyles" onClick={applyStyles}>
        Apply styles
      </button>
      {/* <div>{tag?.textContent}</div> */}
      <PTag tag={element} />
      <ColorStyle tag={element} style={style} />
      <div ref={msg}></div>
    </div>
  );
}

export default App;
