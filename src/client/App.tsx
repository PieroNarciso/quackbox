import { Component, createSignal, onMount } from "solid-js";
import type { AppRouter } from "../server/app";

import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";

const App: Component = () => {

  onMount(async () => {});

  return (
    <div>
      <a href="/login">Login</a>
    </div>
  );
};

export default App;
