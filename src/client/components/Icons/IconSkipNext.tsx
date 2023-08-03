import { Component, JSX } from "solid-js";

type Props = JSX.SVGElementTags["svg"];

const IconSkipNext: Component<Props> = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path d="M16,18H18V6H16M6,18L14.5,12L6,6V18Z" />
    </svg>
  );
};

export default IconSkipNext;
