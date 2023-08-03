import { Component, JSX } from "solid-js";

type Props = JSX.SVGElementTags["svg"];

const IconPause: Component<Props> = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path d="M14,19H18V5H14M6,19H10V5H6V19Z" />
    </svg>
  );
};

export default IconPause;
