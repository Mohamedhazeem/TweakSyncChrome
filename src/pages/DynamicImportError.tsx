function DynamicImportError() {
  return (
    <div className="bg-linear-to-r from-indigo-500 to-red-400 h-dvh">
      <div className="SupportContainer">
        <div className="flex gap-2 items-center font-semibold rounded-lg p-2 text-xl text-darkBlue bg-[#EEEEEE]">
          <div className="text-center">
            Chrome may close some pages of the extension in the background for efficiency. If this
            happens, please close and re-open the extension.
          </div>
        </div>
      </div>
    </div>
  );
}

export default DynamicImportError;
