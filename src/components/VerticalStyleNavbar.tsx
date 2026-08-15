import { TagIcon } from "./Icons/TagIcon";
import { ClassIcon } from "./Icons/ClassIcon";
import { IdIcon } from "./Icons/IdIcon";
import { Button } from "./ui/button";
import { AttributeIcon } from "./Icons/AttributeIcon";
import { DescendantIcon } from "./Icons/DesendantIcon";
import { PseudoElementIcon } from "./Icons/PseudoElementIcon";
import { PseudoClassIcon } from "./Icons/PseudoClassIcon";
import { ChevronDown } from "lucide-react";
type VerticalStyleNavbarType = {
  isVerticalStyleNavbarOpen: boolean;
  verticalStyleNavbarIndex: number;
  handleVerticalStyleNavbarOpen: (isopen: boolean) => void;
  handleVerticalStyleNavbarIndex: (index: number) => void;
  hasStyles: {
    [key: number]: boolean;
  };
};
function VerticalStyleNavbar({
  isVerticalStyleNavbarOpen,
  verticalStyleNavbarIndex,
  handleVerticalStyleNavbarOpen,
  handleVerticalStyleNavbarIndex,
  hasStyles,
}: VerticalStyleNavbarType) {
  const selectedIconColor = "#fef08a";
  return (
    //fixed top-0 left-0
    <div
      className={`verticalNavbarContainer ${isVerticalStyleNavbarOpen ? "ml-1" : "-ml-12"}  z-50`}
    >
      {/* {isVerticalStyleNavbarOpen ? ( */}
      <div className="relative verticalNavbarButtonHolder">
        <Button
          variant={"outline"}
          size={"icon"}
          title="Class Styles"
          className={`relative ${verticalStyleNavbarIndex === 0 ? "navbarButton" : ""}`}
          onClick={() => handleVerticalStyleNavbarIndex(0)}
        >
          <ClassIcon fill={verticalStyleNavbarIndex === 0 ? selectedIconColor : undefined} />
          <NotificationDot show={hasStyles[0]} />
        </Button>
        <Button
          variant={"outline"}
          size={"icon"}
          title="Id Styles"
          className={`relative ${verticalStyleNavbarIndex === 1 ? "navbarButton" : ""}`}
          onClick={() => handleVerticalStyleNavbarIndex(1)}
        >
          <IdIcon fill={verticalStyleNavbarIndex === 1 ? selectedIconColor : undefined} />
          <NotificationDot show={hasStyles[1]} />
        </Button>
        <Button
          variant={"outline"}
          size={"icon"}
          title="Tag Styles"
          className={`relative ${verticalStyleNavbarIndex === 2 ? "navbarButton" : ""}`}
          onClick={() => handleVerticalStyleNavbarIndex(2)}
        >
          <TagIcon fill={verticalStyleNavbarIndex === 2 ? selectedIconColor : undefined} />
          <NotificationDot show={hasStyles[2]} />
        </Button>
        <Button
          variant={"outline"}
          size={"icon"}
          title="Attribute Styles"
          className={`relative ${verticalStyleNavbarIndex === 3 ? "navbarButton" : ""}`}
          onClick={() => handleVerticalStyleNavbarIndex(3)}
        >
          <AttributeIcon fill={verticalStyleNavbarIndex === 3 ? selectedIconColor : undefined} />
          <NotificationDot show={hasStyles[3]} />
        </Button>
        <Button
          variant={"outline"}
          size={"icon"}
          title="Descendant Styles"
          className={`relative ${verticalStyleNavbarIndex === 4 ? "navbarButton" : ""}`}
          onClick={() => handleVerticalStyleNavbarIndex(4)}
        >
          <DescendantIcon fill={verticalStyleNavbarIndex === 4 ? selectedIconColor : undefined} />
          <NotificationDot show={hasStyles[4]} />
        </Button>
        <Button
          variant={"outline"}
          size={"icon"}
          title="Pseudo Element Styles"
          className={`relative ${verticalStyleNavbarIndex === 5 ? "navbarButton" : ""}`}
          onClick={() => handleVerticalStyleNavbarIndex(5)}
        >
          <PseudoElementIcon
            fill={verticalStyleNavbarIndex === 5 ? selectedIconColor : undefined}
          />
          <NotificationDot show={hasStyles[5]} />
        </Button>
        <Button
          variant={"outline"}
          size={"icon"}
          title="Pseudo Class Styles"
          className={`relative ${verticalStyleNavbarIndex === 6 ? "navbarButton" : ""}`}
          onClick={() => handleVerticalStyleNavbarIndex(6)}
        >
          <PseudoClassIcon fill={verticalStyleNavbarIndex === 6 ? selectedIconColor : undefined} />
          <NotificationDot show={hasStyles[6]} />
        </Button>
        {/* <Button>@Rules</Button> */}
      </div>
      {/* //   <div className=" bg-gray-100 h-dvh transition-all duration-300"></div> */}

      <Button
        variant={"outline"}
        size={"icon"}
        onClick={() => handleVerticalStyleNavbarOpen(isVerticalStyleNavbarOpen ? false : true)}
        className={`${
          isVerticalStyleNavbarOpen ? "verticalNavbarStyleClose" : "verticalNavbarStyleOpen"
        } verticalNavbarStyleTriggerButton`}
      >
        {isVerticalStyleNavbarOpen ? (
          <ChevronDown
            className={`h-4 w-4 shrink-0 transition-transform duration-200 rotate-90`}
            stroke={"#222831"}
            strokeWidth={3}
          />
        ) : (
          <ChevronDown
            className={`h-4 w-4 shrink-0 transition-transform duration-200 -rotate-90`}
            stroke={"#222831"}
            strokeWidth={3}
          />
        )}
      </Button>
    </div>
  );
}

export default VerticalStyleNavbar;
type NotificationDotProps = {
  show: boolean;
};

const NotificationDot: React.FC<NotificationDotProps> = ({ show }) => {
  if (!show) return null;

  return (
    <span className={`absolute top-[2px] right-[2px] block size-2 bg-red-600 rounded-full`}></span>
  );
};
