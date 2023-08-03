import {
  Menu,
  MenuContent,
  MenuItem,
  MenuPositioner,
  MenuTrigger,
  Pressable,
} from "@ark-ui/solid";
import IconMultiSpeaker from "@components/Icons/IconMultiSpeaker";
import Tooltip from "@components/Tooltip";
import { AppRouter } from "@server/app";
import { UserDevices } from "@server/spotify/player/schemas/device";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { Component, createSignal, For, onMount } from "solid-js";
import { Portal } from "solid-js/web";

type FilteredDevice = Omit<UserDevices["devices"][0], "id"> & { id: string };

const MenuDevices: Component = () => {
  const [devices, setDevices] = createSignal<FilteredDevice[]>([]);

  const trpc = createTRPCProxyClient<AppRouter>({
    links: [httpBatchLink({ url: "/trpc" })],
  });

  const transferPlayback = async (deviceId: string) => {
    await trpc.transferPlaypack.mutate({
      deviceIds: [deviceId],
    });
  };

  onMount(async () => {
    const { devices } = await trpc.getAvailableDevices.query();
    const devicesWithId = devices.filter(
      (device): device is FilteredDevice => device.id !== null,
    );
    setDevices(devicesWithId);
  });

  return (
    <Menu onSelect={(id) => transferPlayback(id.value)}>
      <MenuTrigger>
        <Tooltip content="Tooltipo jasdjklfa">
          <button class="rounded-full" type="button">
            <IconMultiSpeaker class="h-6 w-6 text-white fill-current" />
          </button>
        </Tooltip>
      </MenuTrigger>
      <Portal>
        <MenuPositioner>
          <MenuContent>
            <For each={devices()} fallback={<div>Loading...</div>}>
              {(device) => (
                <MenuItem id={device.id}>
                  <button onclick={() => transferPlayback(device.id!)}>
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
