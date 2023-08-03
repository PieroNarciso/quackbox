import {
  Menu,
  MenuContent,
  MenuItem,
  MenuPositioner,
  MenuTrigger,
} from "@ark-ui/solid";
import IconButton from "@components/Button/IconButton";
import IconMultiSpeaker from "@components/Icons/IconMultiSpeaker";
import Tooltip from "@components/Tooltip";
import { AppRouter } from "@server/app";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { Component, createSignal, For, onMount } from "solid-js";
import { Portal } from "solid-js/web";
import { FilteredDevice } from "./MainPlayer";

type Props = {
  devices: FilteredDevice[];
}

const MenuDevices: Component<Props> = (props) => {
  const trpc = createTRPCProxyClient<AppRouter>({
    links: [httpBatchLink({ url: "/trpc" })],
  });

  const transferPlayback = async (deviceId: string) => {
    await trpc.transferPlaypack.mutate({
      deviceIds: [deviceId],
    });
  };

  return (
    <Menu onSelect={(id) => transferPlayback(id.value)}>
      <MenuTrigger class="focus:outline-none">
        <Tooltip content="Change devices">
          <IconButton>
            <IconMultiSpeaker class="h-6 w-6 text-white fill-current" />
          </IconButton>
        </Tooltip>
      </MenuTrigger>
      <Portal>
        <MenuPositioner class="z-20 bg-gray-700 rounded overflow-hidden">
          <MenuContent class="focus:outline-none">
            <For each={props.devices} fallback={<div>Loading...</div>}>
              {(device) => (
                <MenuItem id={device.id}>
                  <button
                    class="text-white hover:bg-gray-600 w-full py-2 px-3 focus:outline-none"
                    onclick={() => transferPlayback(device.id)}
                  >
                    {device.name}
                  </button>
                </MenuItem>
              )}
            </For>
          </MenuContent>
        </MenuPositioner>
      </Portal>
    </Menu>
  );
};

export default MenuDevices;
