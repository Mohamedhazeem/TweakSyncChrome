import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import toast from "react-hot-toast";
function Home() {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleMessage = (message: any) => {
      switch (message.action) {
        case "contentScriptInjected":
          toast.success(message.toast);
          break;
        case "contentScriptCantInjected":
          toast.error(message.toast);
          break;
        default:
          break;
      }
    };

    chrome.runtime.onMessage.addListener(handleMessage);

    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage);
    };
  }, []);
  async function connected() {
    console.log("initWebSocket");
    await chrome.runtime.sendMessage({ action: "connect" });
  }
  function inject() {
    chrome.runtime.sendMessage({ action: "injectContentScript" });
  }
  function removeInject() {
    chrome.runtime.sendMessage({ action: "removeContentScript" });
  }
  function applyElement() {
    chrome.runtime.sendMessage({ action: "apply", apply: "element" });
  }
  function applyStyles() {
    chrome.runtime.sendMessage({ action: "apply", apply: "styles" });
  }

  return (
    <div className="inspector-container">
      <div className="inspector-home">
        <span className="tweak-sync-logo">Tweak Sync</span>

        <Button size={"lg"} variant={"default"} type="button" id="connect" onClick={connected}>
          Connect
        </Button>

        <>
          <Button size={"lg"} variant={"default"} type="button" id="inject" onClick={inject}>
            Start Edit
          </Button>
          <Button
            size={"lg"}
            variant={"default"}
            type="button"
            id="remove_inject"
            onClick={removeInject}
          >
            Stop Edit
          </Button>
          <Button
            size={"lg"}
            variant={"default"}
            type="button"
            id="applyElement"
            onClick={applyElement}
          >
            Apply Element
          </Button>
          <Button
            size={"lg"}
            variant={"default"}
            type="button"
            id="applyStyles"
            onClick={applyStyles}
          >
            Apply styles
          </Button>
        </>
      </div>
    </div>
  );
}

export default Home;
