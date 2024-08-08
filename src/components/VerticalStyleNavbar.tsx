import { Button } from "./ui/button";
type VerticalStyleNavbarType = {
  isVerticalStyleNavbarOpen: boolean;
  verticalStyleNavbarIndex: number;
  handleVerticalStyleNavbarOpen: (isopen: boolean) => void;
  handleVerticalStyleNavbarIndex: (index: number) => void;
};
function VerticalStyleNavbar({
  isVerticalStyleNavbarOpen,
  verticalStyleNavbarIndex,
  handleVerticalStyleNavbarOpen,
  handleVerticalStyleNavbarIndex,
}: VerticalStyleNavbarType) {
  return (
    //fixed top-0 left-0
    <div
      className={`verticalNavbarContainer ${isVerticalStyleNavbarOpen ? "ml-1" : "-ml-12"}  z-50`}
    >
      {/* {isVerticalStyleNavbarOpen ? ( */}
      <div className="verticalNavbarButtonHolder">
        <Button
          variant={"outline"}
          size={"icon"}
          title="Class Styles"
          className={verticalStyleNavbarIndex === 0 ? "navbarButton" : ""}
          onClick={() => handleVerticalStyleNavbarIndex(0)}
        >
          Class
        </Button>
        <Button
          variant={"outline"}
          size={"icon"}
          title="Id Styles"
          className={verticalStyleNavbarIndex === 1 ? "navbarButton" : ""}
          onClick={() => handleVerticalStyleNavbarIndex(1)}
        >
          Id
        </Button>
        <Button
          variant={"outline"}
          size={"icon"}
          title="Tag Styles"
          className={verticalStyleNavbarIndex === 2 ? "navbarButton" : ""}
          onClick={() => handleVerticalStyleNavbarIndex(2)}
        >
          Tag
        </Button>
        <Button
          variant={"outline"}
          size={"icon"}
          title="Attribute Styles"
          className={verticalStyleNavbarIndex === 3 ? "navbarButton" : ""}
          onClick={() => handleVerticalStyleNavbarIndex(3)}
        >
          Attr
        </Button>
        <Button
          variant={"outline"}
          size={"icon"}
          title="Descendant Styles"
          className={verticalStyleNavbarIndex === 4 ? "navbarButton" : ""}
          onClick={() => handleVerticalStyleNavbarIndex(4)}
        >
          Desc
        </Button>
        <Button
          variant={"outline"}
          size={"icon"}
          title="Pseudo Element Styles"
          className={verticalStyleNavbarIndex === 5 ? "navbarButton" : ""}
          onClick={() => handleVerticalStyleNavbarIndex(5)}
        >
          PEle
        </Button>
        <Button
          variant={"outline"}
          size={"icon"}
          title="Pseudo Class Styles"
          className={verticalStyleNavbarIndex === 6 ? "navbarButton" : ""}
          onClick={() => handleVerticalStyleNavbarIndex(6)}
        >
          PClas
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
