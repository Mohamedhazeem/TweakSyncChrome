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
      </StyleLayout>
    </>
  );
}

export default StyleFactory;

//   const DefaultAttribute: React.FC = () => {
//     return <div>Default Attribute Component</div>;
//   };
//   function matchAttribute(
//     name: string,
//     patterns: { [key: string]: React.ComponentType }
//   ): React.ComponentType {
//     for (const pattern in patterns) {
//       const regex = new RegExp(`^${pattern.replace(/\*/g, ".*")}$`);
//       if (regex.test(name)) {
//         return patterns[pattern];
//       }
//     }
//     return DefaultAttribute;
//   }
