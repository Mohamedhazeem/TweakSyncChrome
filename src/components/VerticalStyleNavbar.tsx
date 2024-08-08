import { Button } from "./ui/button";
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
          Class
          <NotificationDot show={hasStyles[0]} />
        </Button>
        <Button
          variant={"outline"}
          size={"icon"}
          title="Id Styles"
          className={`relative ${verticalStyleNavbarIndex === 1 ? "navbarButton" : ""}`}
          onClick={() => handleVerticalStyleNavbarIndex(1)}
        >
          Id
          <NotificationDot show={hasStyles[1]} />
        </Button>
        <Button
          variant={"outline"}
          size={"icon"}
          title="Tag Styles"
          className={`relative ${verticalStyleNavbarIndex === 2 ? "navbarButton" : ""}`}
          onClick={() => handleVerticalStyleNavbarIndex(2)}
        >
          Tag
          <NotificationDot show={hasStyles[2]} />
        </Button>
        <Button
          variant={"outline"}
          size={"icon"}
          title="Attribute Styles"
          className={`relative ${verticalStyleNavbarIndex === 3 ? "navbarButton" : ""}`}
          onClick={() => handleVerticalStyleNavbarIndex(3)}
        >
          Attr
          <NotificationDot show={hasStyles[3]} />
        </Button>
        <Button
          variant={"outline"}
          size={"icon"}
          title="Descendant Styles"
          className={`relative ${verticalStyleNavbarIndex === 4 ? "navbarButton" : ""}`}
          onClick={() => handleVerticalStyleNavbarIndex(4)}
        >
          Desc
          <NotificationDot show={hasStyles[4]} />
        </Button>
        <Button
          variant={"outline"}
          size={"icon"}
          title="Pseudo Element Styles"
          className={`relative ${verticalStyleNavbarIndex === 5 ? "navbarButton" : ""}`}
          onClick={() => handleVerticalStyleNavbarIndex(5)}
        >
          PEle
          <NotificationDot show={hasStyles[5]} />
        </Button>
        <Button
          variant={"outline"}
          size={"icon"}
          title="Pseudo Class Styles"
          className={`relative ${verticalStyleNavbarIndex === 6 ? "navbarButton" : ""}`}
          onClick={() => handleVerticalStyleNavbarIndex(6)}
        >
          PClas
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
        {isVerticalStyleNavbarOpen ? `<` : `>`}
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
    <span
      className={`absolute top-[2px] right-[2px] block w-1.5 h-1.5 bg-red-600 rounded-full`}
    ></span>
  );
};
