import { Component, JSX } from "solid-js";

type Props = JSX.SVGElementTags["svg"];

const IconSkipPrev: Component<Props> = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <title>skip-previous</title>
      <path d="M6,18V6H8V18H6M9.5,12L18,6V18L9.5,12Z" />
    </svg>
  );
};

export default IconSkipPrev;
