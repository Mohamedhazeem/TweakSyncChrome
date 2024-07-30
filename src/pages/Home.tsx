import { Button } from "@/components/ui/button";
function Home() {
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
        <Button size={"lg"} variant={"default"} type="button" id="inject" onClick={inject}>
          Inject
        </Button>
        <Button
          size={"lg"}
          variant={"default"}
          type="button"
          id="remove_inject"
          onClick={removeInject}
        >
          Remove Inject
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
      </div>
    </div>
  );
}

export default Home;
