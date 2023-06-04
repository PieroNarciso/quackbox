import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "../../../server/app";
import { Component, createSignal, For } from "solid-js";
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

  return (
    <div>
      <button onclick={getTopTracks}>Tracks</button>
      <For each={tracks()}>{(track) => (
        <div>
          <img src={track.album.images[0].url} />
        </div>
      )}
      </For>
    </div>
  );
};

export default AppHome;
