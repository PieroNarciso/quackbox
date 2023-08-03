import {
  Tooltip as ArkTooltip,
  TooltipContent,
  TooltipPositioner,
  TooltipTrigger,
} from "@ark-ui/solid";
import { ParentComponent } from "solid-js";
import { Portal } from "solid-js/web";

type Props = {
  content: string;
};

const Tooltip: ParentComponent<Props> = (props) => {
  return (
    <ArkTooltip>
      <TooltipTrigger>{props.children}</TooltipTrigger>
      <Portal>
        <TooltipPositioner>
          <TooltipContent>{props.content}</TooltipContent>
        </TooltipPositioner>
      </Portal>
    </ArkTooltip>
  );
};

export default Tooltip;