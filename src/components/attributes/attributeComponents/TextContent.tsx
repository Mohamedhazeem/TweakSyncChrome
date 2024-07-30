import { ElementDetails } from "@/types/elementTypes";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
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
  const handleRemoveClick = () => {
    setTextContent("");
    chrome.runtime.sendMessage({
      action: "updateTextContent",
      text: "",
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
        <>
          <Card className="layoutCard">
            <CardHeader
              className={`layoutCardHeader ${
                textContent ? "layoutCardHeaderActive" : "layoutCardHeaderInActive"
              } `}
            >
              <CardTitle className="layoutCardTitle">
                Text Content
                <div className="layoutHoverCardHolder">
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Button variant="outline" size="sm" className="layoutHoverCardTriggerButton">
                        ?
                      </Button>
                    </HoverCardTrigger>
                    <HoverCardContent className="layoutHoverCardContent">
                      <p className="layoutHoverCardContentDiscription">
                        {"Here you can type text of the element"}
                      </p>
                    </HoverCardContent>
                  </HoverCard>
                  {textContent && (
                    <Button
                      size="sm"
                      variant={"default"}
                      className="layoutClearButton"
                      onClick={() => handleRemoveClick()}
                    >
                      CLEAR
                    </Button>
                  )}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="layoutCardContent">
              <Textarea
                className="resize-none"
                placeholder="Type your message here."
                id="message"
                value={textContent ? textContent : ""}
                onChange={handleTextContentChange}
              />
            </CardContent>
          </Card>
        </>
      );
    } else {
      return <></>;
    }
  };
  return (
    <>{ShowTextContent()}</>
    //  {/* {tag?.path && <p>{tag.path}</p>} */}
  );
}

export default TextContent;
