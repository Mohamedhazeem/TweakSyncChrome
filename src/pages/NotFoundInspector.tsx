import { Info } from "lucide-react";
type NotFoundInspectorType = {
  inspectorName: string;
};
function NotFoundInspector({ inspectorName }: NotFoundInspectorType) {
  return (
    <div className="inspector-container">
      <div className="inspector-scroll">
        <div className="inspector-component ">
          <div className="inspector-header">
            <span className="inspector-title">{inspectorName}</span>
          </div>
        </div>
        <div className="w-full h-full flex flex-col gap-3 justify-center items-center">
          <div className="border-4 border-[#EEEEEE] rounded-lg">
            <div className="flex gap-2 items-center font-medium p-2 text-sm">
              <Info size={50} color="darkorange" />
              <div className="text-justify">
                Ready to edit? Click
                <span className="text-base font-semibold px-1 rounded-lg layoutCardHeaderActive">
                  Start Edit
                </span>
                , then click what you want to customize.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFoundInspector;
