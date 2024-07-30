// import StyleLayout from "./StyleLayout";
import { styleComponents } from "./styleFacade";

type styleFatory = {
  name: string;
};
// create a state to manage and avoid duplicate property component add
function StyleFactory({ name }: styleFatory) {
  const SpecificComponent = styleComponents[name];
  return (
    <>
      <SpecificComponent />
    </>
  );
}

export default StyleFactory;
