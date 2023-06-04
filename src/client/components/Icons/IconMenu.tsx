import type { Component, JSX } from "solid-js";

type Props = JSX.SVGElementTags["svg"];

const IconSpotify: Component<Props> = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <title>menu</title>
      <path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
    </svg>
  );
};

export default IconSpotify;