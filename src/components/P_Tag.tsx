import { useEffect, useState } from "react";
import { ElementDetails } from "../types/ElementTypes";

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
    <>
      {textContent && (
        <textarea
          className="resize-none"
          rows={6}
          placeholder="Wite a Text"
          value={textContent}
          onChange={handleTextContentChange}
        />
      )}
      {tag?.path && <p>{tag.path}</p>}
    </>
  );
}

export default PTag;
