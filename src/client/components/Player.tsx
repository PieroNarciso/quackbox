import { Component, JSX } from "solid-js";
import IconPlay from "./Icons/IconPlay";
import IconSkipNext from "./Icons/IconSkipNext";
import IconSkipPrev from "./Icons/IconSkipPrev";

type Props = JSX.HTMLAttributes<HTMLDivElement>;

const Player: Component<Props> = (props) => {
  return (
    <div class="sticky w-full bg-red-500 z-50 bottom-0" {...props}>
      <div class="flex items-center justify-center w-full">
        <button>
          <IconSkipPrev class="h-7 w-7 fill-current text-white" />
        </button>
        <button>
          <IconPlay class="h-7 w-7 fill-current text-white" />
        </button>
        <button>
          <IconSkipNext class="h-7 w-7 fill-current text-white" />
        </button>
      </div>
    </div>
  );
};

export default Player;
