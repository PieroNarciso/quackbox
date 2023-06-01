import { Component } from "solid-js";
import IconSpotify from "@components/Icons/IconSpotify";

const Default: Component = () => {
  return (
    <div class="h-screen w-screen flex items-center justify-center">
      <a
        class="px-3 py-2 bg-green-500 rounded text-white font-medium flex items-center"
        href="/login"
      >
        <span class="text-lg">Login</span>
        <IconSpotify class="ml-2 h-8 w-8 fill-current text-white" />
      </a>
    </div>
  );
};

export default Default;
