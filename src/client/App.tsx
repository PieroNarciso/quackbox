import { Component, createSignal, onMount } from "solid-js";
import type { AppRouter } from "../server/app";

import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";

const App: Component = () => {
  const [hello, setHello] = createSignal("");

  const trpc = createTRPCProxyClient<AppRouter>({
    links: [
      httpBatchLink({
        url: "http://localhost:3000/trpc",
      }),
    ],
  });

  onMount(async () => {
    const data = await trpc.hello.query("world!");
    console.log(data);

    setHello(data);

    const data2 = await trpc.example.query();
    console.log(data2);
  });

  return <div>{hello()}</div>;
};

export default App;
