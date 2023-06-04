import { ParentComponent, Show } from "solid-js";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const Drawer: ParentComponent<Props> = (props) => {
  return (
    <Show when={props.isOpen}>
      <div class="h-screen w-screen fixed top-0 left-0">
        <div class="bg-gray-600 h-full inline-block w-56">Content</div>
        <div
          class="h-full w-screen fixed bg-black opacity-25 inline-block"
          onclick={() => props.onClose()}
        >
          {props.children}
        </div>
      </div>
    </Show>
  );
};

export default Drawer;
