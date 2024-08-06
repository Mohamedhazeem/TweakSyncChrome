import { ElementDetails, ElementStyles } from "@/types/elementTypes";
import { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { Button } from "./ui/button";
import { toast } from "react-hot-toast";
export const Navbar = () => {
  const [elementDetails, setElementDetails] = useState<ElementDetails | null>(null);
  const [elementStyle, setElementStyle] = useState<ElementStyles | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleMessage = (message: any) => {
    if (message.action === "showElementDetails") {
      setElementDetails(message.details || null);
    } else if (message.action === "showElementStyles") {
      setElementStyle(message.styles || null);
    } else if (message.action === "webSocketConnectionError") {
      toast.error(message.toast);
    } else if (message.action === "webSocketConnectionOpen") {
      toast.success(message.toast);
    } else if (message.action === "webSocketConnectionClose") {
      toast.error(message.toast);
    }
  };

  useEffect(() => {
    chrome.runtime.onMessage.addListener(handleMessage);
    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage);
    };
  }, []);

  const getUpdatedElementDetails = () => {
    chrome.runtime.sendMessage(
      { action: "getUpdatedDetails", apply: "element" }
      //, (response) => {
      // if (response && response.status === "success") {
      //   setElementDetails(response.details || null);
      //   console.error("working", response.details || "No response received");
      // } else {
      //   console.error(
      //     "Error getting updated element details:",
      //     response ? response.message : "No response received"
      //   );
      // }
      // }
    );
  };

  const getUpdatedStyleDetails = () => {
    chrome.runtime.sendMessage({ action: "getUpdatedDetails", apply: "styles" }, (response) => {
      if (response && response.status === "success") {
        setElementStyle(response.styles || null);
      } else {
        console.error(
          "Error getting updated style details:",
          response ? response.message : "No response received"
        );
      }
    });
  };

  return (
    <>
      <div className="flex flex-col fixed bottom-0 w-full z-50">
        <nav className="border-t bg-slate-100 px-4 py-2 flex justify-center gap-4">
          <Button variant="outline" size="default" data-TweakSyncUI>
            <Link to={"/"}>Home</Link>
          </Button>
          <Button
            variant="outline"
            size="default"
            data-TweakSyncUI
            onClick={getUpdatedElementDetails}
          >
            <Link to={"/elementInspector"}>Inspector</Link>
          </Button>
          <Button
            variant="outline"
            size="default"
            data-TweakSyncUI
            onClick={getUpdatedStyleDetails}
          >
            <Link to={"/styleInspector"}>Style</Link>
          </Button>
        </nav>
      </div>
      <Outlet context={{ element: elementDetails, style: elementStyle }} />
    </>
  );
};

// className="flex sm:flex-row flex-col sm:justify-between justify-center items-center p-5 bg-cyan-800"
//className="lg:text-lg font-bold"
// function HomeIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
//       <polyline points="9 22 9 12 15 12 15 22" />
//     </svg>
//   )
// }

// function InfoIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <circle cx="12" cy="12" r="10" />
//       <path d="M12 16v-4" />
//       <path d="M12 8h.01" />
//     </svg>
//   )
// }

// function SettingsIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
//       <circle cx="12" cy="12" r="3" />
//     </svg>
//   )
// }
