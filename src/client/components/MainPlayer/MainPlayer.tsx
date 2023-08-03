import { userStore } from "@client/store";
import IconPause from "@components/Icons/IconPause";
import IconPlay from "@components/Icons/IconPlay";
import { Component, createSignal, JSX, onMount, Show } from "solid-js";
import IconSkipNext from "../Icons/IconSkipNext";
import IconSkipPrev from "../Icons/IconSkipPrev";
import MenuDevices from "./MenuDevices";

type Props = JSX.HTMLAttributes<HTMLDivElement>;

const MainPlayer: Component<Props> = (props) => {
  const [spotifyPlayer, setSpotifyPlayer] = createSignal<Spotify.Player>();
  const [user] = userStore;
  const [isPlaying, setIsPlaying] = createSignal<boolean>(false);

  onMount(async () => {
    window.onSpotifyWebPlaybackSDKReady = async () => {
      const player = new window.Spotify.Player({
        name: "Quackbox",
        getOAuthToken: (cb) => {
          cb(user.oauthToken);
        },
      });
      player.connect();

      setSpotifyPlayer(player);

      player.addListener("player_state_changed", (state) => {
        state.paused ? setIsPlaying(false) : setIsPlaying(true);
      });

      player.addListener("ready", async ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
      });
    };
  });

  return (
    <div class="sticky w-full z-50 bottom-0 bg-gray-700 py-3 flex" {...props}>
      <div class="flex items-center justify-center w-full">
        <button onclick={() => spotifyPlayer()?.previousTrack()}>
          <IconSkipPrev class="h-7 w-7 fill-current text-white" />
        </button>
        <button onclick={() => spotifyPlayer()?.togglePlay()}>
          <Show
            when={isPlaying()}
            fallback={<IconPlay class="h-7 w-7 fill-current text-white" />}
          >
            <IconPause class="h-7 w-7 fill-current text-white" />
          </Show>
        </button>
        <button onclick={() => spotifyPlayer()?.nextTrack()}>
          <IconSkipNext class="h-7 w-7 fill-current text-white" />
        </button>
      </div>
      <div>
        <MenuDevices />
      </div>
    </div>
  );
};

export default MainPlayer;
