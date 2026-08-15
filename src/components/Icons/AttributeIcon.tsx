import { SVGProps } from "react";
export const AttributeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    width="1em"
    height="1em"
    viewBox="0 0 12.631 14.951"
    {...props}
  >
    <path
      d="M3.59 14.183q0 .426-.076.597-.077.17-.222.17H.657q-.145 0-.265-.042-.12-.043-.204-.128-.086-.085-.137-.222Q0 14.422 0 14.234V.708q0-.18.051-.316T.188.171Q.273.077.392.043.512 0 .657 0h2.635q.068 0 .128.043.06.034.094.128.042.085.06.23.017.145.017.367 0 .435-.077.605-.077.162-.222.162H2.004v11.88h1.288q.068 0 .128.035.06.034.094.128.042.093.06.238.017.145.017.367zm9.04.051q0 .188-.059.324-.051.137-.136.222-.086.085-.205.128-.12.042-.264.042H9.322q-.145 0-.222-.17-.077-.17-.077-.597 0-.222.017-.367.026-.145.06-.239.043-.094.094-.128.06-.034.128-.034h1.296V1.535H9.322q-.145 0-.222-.162-.077-.17-.077-.606 0-.221.017-.366.026-.145.06-.23.043-.094.094-.129Q9.254 0 9.322 0h2.644q.145 0 .264.042.12.035.205.128.085.086.136.222.06.137.06.316z"
      aria-label="[ ]"
      style={{
        fontWeight: 700,
        fontSize: "14.1111px",
        lineHeight: 2.5,
        fontFamily: "Calibri",
        // InkscapeFontSpecification: "&quot",
        textAlign: "center",
        textAnchor: "middle",
        fill: props.fill || "#222831",
        fillOpacity: 1,
        stroke: props.fill || "#222831",
        strokeWidth: 0.8,
        strokeLinecap: "square",
        strokeMiterlimit: 5,
        paintOrder: "fill markers stroke",
      }}
    />
  </svg>
);
