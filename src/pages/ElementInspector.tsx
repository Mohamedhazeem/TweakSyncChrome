import PTag from "@/components/P_Tag";
import { OutletContext } from "@/types/OutletContext";
import { useOutletContext } from "react-router-dom";

function ElementInspector() {
  const { element } = useOutletContext<OutletContext>();
  if (!element) {
    return <div> Not element selected</div>;
  }
  return (
    <div>
      <PTag tag={element} />
    </div>
  );
}

export default ElementInspector;
