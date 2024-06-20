import { ElementDetails, ElementStyles } from "@/types/ElementTypes";
import { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";

export const Navbar = () => {
  const [elementDetails, setElementDetails] = useState<ElementDetails>();
  const [elementStyle, setElementStyle] = useState<ElementStyles>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleMessage = (message: any) => {
    if (message.action === "showElementDetails") {
      setElementDetails(undefined);
      setElementDetails(message.details);
    } else if (message.action === "showElementStyles") {
      setElementStyle(undefined);
      setElementStyle(message.styles);
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
    <>
      <div id="navbar-container">
        <ul>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/elementInspector"}>Inspector</Link>
          </li>
          <li>
            <Link to={"/styleInspector"}>Style</Link>
          </li>
        </ul>
      </div>

      <Outlet context={{ element: elementDetails, style: elementStyle }} />
    </>
  );
};
// className="flex sm:flex-row flex-col sm:justify-between justify-center items-center p-5 bg-cyan-800"
//className="lg:text-lg font-bold"
