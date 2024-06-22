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
    <div className="w-full h-[calc(100vh-65px)] flex items-center justify-center">
      <div className="flex flex-col space-y-4 overflow-y-auto h-full w-full p-4 items-center justify-center">
        <span className="bg-slate-400 rounded-md font-semibold text-4xl">
          Tweak Sync
        </span>
        <Button type="button" id="connect" onClick={connected}>
          Connect
        </Button>
        <Button type="button" id="inject" onClick={inject}>
          Inject
        </Button>
        <Button type="button" id="remove_inject" onClick={removeInject}>
          Remove Inject
        </Button>
        <Button type="button" id="applyElement" onClick={applyElement}>
          Apply Element
        </Button>
        <Button type="button" id="applyStyles" onClick={applyStyles}>
          Apply styles
        </Button>
      </div>
    </div>
  );
}

export default Home;
