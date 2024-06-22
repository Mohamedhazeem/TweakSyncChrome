import PTag from "@/components/P_Tag";
import { OutletContext } from "@/types/OutletContext";
import { useOutletContext } from "react-router-dom";

function ElementInspector() {
  const { element } = useOutletContext<OutletContext>();
  if (!element) {
    return <div> Not element selected</div>;
  }
  return (
    <div className="w-full h-[calc(100vh-65px)] flex items-center justify-center">
      <div className="flex flex-col space-y-4 overflow-y-auto h-full w-full p-4">
        <PTag tag={element} />
      </div>
    </div>
  );
}

export default ElementInspector;
