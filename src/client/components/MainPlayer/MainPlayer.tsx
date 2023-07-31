import { userStore } from "@client/store";
import { Component, createSignal, JSX, onMount } from "solid-js";
import IconPlay from "../Icons/IconPlay";
import IconSkipNext from "../Icons/IconSkipNext";
import IconSkipPrev from "../Icons/IconSkipPrev";

type Props = JSX.HTMLAttributes<HTMLDivElement>;

const MainPlayer: Component<Props> = (props) => {
  const [spotifyPlayer, setSpotifyPlayer] = createSignal<Spotify.Player>();
  const [user] = userStore;

  onMount(async () => {
    const script = document.createElement("src") as HTMLScriptElement;
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "Web Playback SDK",
        getOAuthToken: (cb) => {
          cb(user.oauthToken);
        },
        volume: 0.5,
      });
      console.log("player");
      console.log(player);

      player.connect();
      console.log("player");
      console.log(player);

      setSpotifyPlayer(player);
      console.log(spotifyPlayer)
    };
    // const playerState = await trpc.getPlayerState.query();
    // console.log(playerState);
  });

  return (
    <div class="sticky w-full z-50 bottom-0 bg-gray-700 py-3" {...props}>
      <div class="flex items-center justify-center w-full">
        <button onclick={() => spotifyPlayer()?.previousTrack()}>
          <IconSkipPrev class="h-7 w-7 fill-current text-white" />
        </button>
        <button onclick={() => spotifyPlayer()?.togglePlay()}>
          <IconPlay class="h-7 w-7 fill-current text-white" />
        </button>
        <button onclick={() => spotifyPlayer()?.nextTrack()}>
          <IconSkipNext class="h-7 w-7 fill-current text-white" />
        </button>
      </div>
    </div>
  );
};

export default MainPlayer;
