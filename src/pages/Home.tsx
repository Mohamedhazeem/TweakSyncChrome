import { TweakSyncIcon } from "@/components/Icons/TweakSyncIcon";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
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
    await chrome.runtime.sendMessage({ action: "connect" });
  }
  function inject() {
    chrome.runtime.sendMessage({ action: "injectContentScript" });
  }
  function removeInject() {
    chrome.runtime.sendMessage({ action: "removeContentScript" });
  }

  return (
    <div className="inspector-container">
      <div className="w-full flex flex-row justify-end p-3">
        <Link to={"/tutorial"}>
          <Button
            variant="outline"
            size="sm"
            data-tweaksyncui
            className="tutorialButton"
            title="Tutorial"
          >
            ?
          </Button>
        </Link>
      </div>

      <div className="inspector-home">
        <span className="tweak-sync-logo">
          <TweakSyncIcon />
          TweakSync
        </span>
        <div className="homePageButtons">
          <Button
            size={"lg"}
            variant={"default"}
            type="button"
            className="connect hover:bg-[#1ecaadec]"
            id="connect"
            onClick={connected}
          >
            Connect
          </Button>

          <Button
            size={"lg"}
            variant={"default"}
            type="button"
            className="startEdit hover:bg-[#0055d4bf]"
            id="inject"
            onClick={inject}
          >
            Start Edit
          </Button>
          <Button
            size={"lg"}
            variant={"default"}
            type="button"
            className="stopEdit hover:bg-[#f74848]"
            id="remove_inject"
            onClick={removeInject}
          >
            Stop Edit
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Home;
