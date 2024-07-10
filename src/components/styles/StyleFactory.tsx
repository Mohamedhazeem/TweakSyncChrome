import StyleLayout from "./StyleLayout";
import { styleComponents } from "./styleFacade";

type styleFatory = {
  name: string;
};
// create a state to manage and avoid duplicate property component add
function StyleFactory({ name }: styleFatory) {
  const SpecificComponent = styleComponents[name];

  // const AttributeComponent =
  //   SpecificComponent || matchAttribute(style.name);

  return (
    <>
      <StyleLayout>
        <SpecificComponent />
        {/* need default style layout for non supported properties */}
      </StyleLayout>
    </>
  );
}

export default StyleFactory;
