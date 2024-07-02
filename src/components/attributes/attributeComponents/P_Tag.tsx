import { ElementDetails } from "@/types/ElementTypes";
import { useEffect, useState } from "react";

type PTagTypes = {
  tag?: ElementDetails;
};

function PTag({ tag }: PTagTypes) {
  const [textContent, setTextContent] = useState<string | undefined | null>("");
  useEffect(() => {
    setTextContent(tag?.textContent);
  }, [tag?.textContent, tag?.path]);
  const handleTextContentChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setTextContent(e.target.value);
    chrome.runtime.sendMessage({
      action: "updateTextContent",
      text: e.target.value,
      temporaryId: tag?.temporaryId,
    });
  };
  return (
    <div>
      {textContent && (
        <textarea
          className="resize-none w-full bg-slate-500"
          rows={6}
          placeholder="Wite a Text"
          value={textContent}
          onChange={handleTextContentChange}
        />
      )}
      {/* {tag?.path && <p>{tag.path}</p>} */}
    </div>
  );
}

export default PTag;
