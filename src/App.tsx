import { useState, useEffect, useRef } from "react";
import "./App.css";
import { ElementDetails } from "./types/ElementDetailTypes";
import PTag from "./components/P_Tag";

function App() {
  const [receivedMessage, setReceivedMessage] = useState("");
  const [tag, setTag] = useState<ElementDetails>();
  const msg = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleMessage = (message: any) => {
    if (message.action === "receivedMessage") {
      setReceivedMessage(message.data);
      msg.current!.innerText = message.data;
    } else if (message.action === "showElementDetails") {
      setTag(undefined);
      setTag(message.details);
      //setSelectedTemporaryId(message.details.temporaryId);
      msg.current!.innerText = message.details.tagName;
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
  function apply() {
    chrome.runtime.sendMessage({ action: "apply" });
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
      <button type="button" id="apply" onClick={apply}>
        Apply
      </button>
      {/* <div>{tag?.textContent}</div> */}
      <PTag tag={tag} />
      <div ref={msg}></div>
    </div>
  );
}

export default App;
//"content_scripts": [
//   {
//     "matches": ["<all_urls>"],
//     "js": ["scripts/content.js"]
//   }
// ],
