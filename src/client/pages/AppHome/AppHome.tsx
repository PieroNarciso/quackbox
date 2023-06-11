import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "../../../server/app";
import { Component, createSignal, For, onMount } from "solid-js";
import { TopItems } from "@server/spotify/user/schemas/top-items";

const AppHome: Component = () => {
  const [tracks, setTracks] = createSignal<TopItems>([]);

  const trpc = createTRPCProxyClient<AppRouter>({
    links: [httpBatchLink({ url: "/trpc" })],
  });

  const getTopTracks = async () => {
    const response = await trpc.userTopItems.query({
      type: "tracks",
      limit: 10,
    });

    setTracks(response.items);
  };

  const getTrack = async (id: string) => {
    // const track = await trpc.getTrack.query(id);
    // console.log(track);
  };

  onMount(() => {
    getTopTracks();
  });

  return (
    <div class="grid grid-cols-2 gap-x-2 gap-y-2">
      <For each={tracks()}>
        {(track) => (
          <div onmouseover={() => getTrack(track.id)}>
            <img src={track.album.images[0].url} />
          </div>
        )}
      </For>
    </div>
  );
};

export default AppHome;
