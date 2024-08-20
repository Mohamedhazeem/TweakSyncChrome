import { SVGProps } from "react";
export const ClassIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    width="0.7em"
    height="0.7em"
    viewBox="0 0 10 10"
    {...props}
  >
    <circle
      cx={4.795}
      cy={4.795}
      r={4.795}
      style={{
        fill: props.fill || "#222831",
        fillOpacity: 1,
        stroke: "#000",
        strokeWidth: 0,
        strokeLinecap: "square",
        strokeLinejoin: "miter",
        strokeMiterlimit: 5,
        strokeDasharray: "none",
        paintOrder: "fill markers stroke",
      }}
    />
  </svg>
);
