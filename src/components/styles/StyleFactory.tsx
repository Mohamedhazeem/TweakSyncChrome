import { IStyleContext } from "@/types/styleTypes";
import StyleLayout from "./StyleLayout";
import { styleComponents } from "./styleFacade";

function StyleFactory({
  key,
  style,
  index,
  onChange,
  onRemove,
}: IStyleContext) {
  const SpecificComponent = styleComponents[style.name];

  // const AttributeComponent =
  //   SpecificComponent || matchAttribute(style.name);

  return (
    <>
      <StyleLayout
        key={key}
        style={style}
        onChange={onChange!}
        onRemove={onRemove}
        index={index}
      >
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
