type NoStylesMessageType = {
  verticalStyleNavbarIndex: number;
};
function NoStylesMessage({ verticalStyleNavbarIndex }: NoStylesMessageType) {
  return (
    <div className="flex justify-center items-center h-[calc(100vh-22vh)] mx-3">
      <div className="flex flex-col gap-3 justify-center items-center border-[2px] border-gray-400 bg-[#EEEEEE] rounded-lg p-1">
        <div className="flex gap-2 items-center rounded-lg font-medium text-sm ">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">No Styles Found</h2>
            <p className="text-gray-600">
              It looks like you don't have any styles to show at the moment.
            </p>
            <p className="text-gray-600 mt-2">
              <strong>To get started:</strong>{" "}
              {verticalStyleNavbarIndex == 0
                ? "Add new class in Element Inspector"
                : verticalStyleNavbarIndex == 1
                ? "Add an Id in Element Inspector"
                : "Create and add new styles in your stylesheet."}
            </p>
            <p className="text-gray-600 mt-2">
              {verticalStyleNavbarIndex == 0
                ? "Once you add class, they will appear here for you to edit and customize."
                : verticalStyleNavbarIndex == 1
                ? "Once you add Id, they will appear here for you to edit and customize."
                : "Once you add some styles, they will appear here for you to edit and customize."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoStylesMessage;
