import { JSX, ParentComponent } from "solid-js";

type Props = JSX.HTMLAttributes<HTMLButtonElement>;

const IconButton: ParentComponent<Props> = (props) => {
  return (
    <button
      type="button"
      class="text-white bg-gray-700 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"
      {...props}
    >
      {props.children}
      <span class="sr-only">Icon description</span>
    </button>
  );
};

export default IconButton;
