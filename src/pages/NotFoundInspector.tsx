import { Info } from "lucide-react";
type NotFoundInspectorType = {
  inspectorName: string;
  isError?: boolean;
};
function NotFoundInspector({ inspectorName, isError }: NotFoundInspectorType) {
  return (
    <div className="inspector-container">
      <div className="inspector-scroll">
        <div className="inspector-component ">
          <div className="inspector-header">
            <span className="inspector-title">{inspectorName}</span>
          </div>
        </div>
        <div className="w-full h-full flex flex-col gap-3 justify-center items-center">
          <div className={`${isError ? "" : "border-4 border-[#EEEEEE] rounded-lg"}`}>
            <div className="flex gap-2 items-center font-medium p-2 text-sm">
              {!isError && <Info size={50} color="red" />}
              {isError ? (
                <div className="flex gap-2 items-center font-semibold rounded-lg p-2 text-xl text-darkBlue bg-[#EEEEEE]">
                  <div className="text-center">
                    Chrome may close some pages of the extension in the background for efficiency.
                    If this happens, please close and re-open the extension.
                  </div>
                </div>
              ) : (
                <div className="text-justify">
                  Ready to edit? Click
                  <span className="text-base font-semibold px-1 rounded-lg layoutCardHeaderActive">
                    Start Edit
                  </span>
                  , then click what you want to customize.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFoundInspector;
