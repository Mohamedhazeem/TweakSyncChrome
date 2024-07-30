import { ElementDetails } from "@/types/elementTypes";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
type PTagTypes = {
  tag: ElementDetails;
};

function TextContent({ tag }: PTagTypes) {
  const [textContent, setTextContent] = useState<string | undefined | null>("");
  useEffect(() => {
    setTextContent(tag?.textContent);
  }, [tag?.textContent, tag?.path]);
  const handleTextContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextContent(e.target.value);
    chrome.runtime.sendMessage({
      action: "updateTextContent",
      text: e.target.value,
      temporaryId: tag?.temporaryId,
    });
  };
  const textContentElements = [
    "a",
    "abbr",
    "address",
    "article",
    "aside",
    "b",
    "bdi",
    "bdo",
    "blockquote",
    "button",
    "caption",
    "cite",
    "code",
    "data",
    "dd",
    "del",
    "details",
    "dfn",
    "div",
    "dl",
    "dt",
    "em",
    "figcaption",
    "footer",
    "header",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "i",
    "ins",
    "kbd",
    "label",
    "legend",
    "li",
    "main",
    "mark",
    "nav",
    "output",
    "p",
    "pre",
    "q",
    "rp",
    "rt",
    "ruby",
    "s",
    "samp",
    "section",
    "small",
    "span",
    "strong",
    "sub",
    "summary",
    "sup",
    "td",
    "th",
    "time",
    "u",
    "var",
    "textarea",
    "option",
    "optgroup",
    "legend",
    "datalist",
    "figcaption",
    "fieldset",
    "iframe",
    "noscript",
    "summary",
    "textarea",
    "title",
  ];
  const ShowTextContent = () => {
    if (textContent || textContentElements.includes(tag.tagName!)) {
      return (
        <div className="grid w-full gap-1.5">
          <Label htmlFor="message">Text Content</Label>
          <Textarea
            className="resize-none"
            placeholder="Type your message here."
            id="message"
            value={textContent!}
            onChange={handleTextContentChange}
          />
        </div>
      );
    } else {
      return <></>;
    }
  };
  return (
    <>{ShowTextContent()}</>
    // <div>
    //   {textContent && (
    //     <textarea
    //       className="resize-none w-full bg-slate-500"
    //       rows={6}
    //       placeholder="Wite a Text"
    //       value={textContent}
    //       onChange={handleTextContentChange}
    //     />
    //   )}
    //   {/* {tag?.path && <p>{tag.path}</p>} */}
    // </div>
  );
}

export default TextContent;
