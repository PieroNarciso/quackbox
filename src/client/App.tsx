import { Component, createSignal, onMount } from "solid-js";
import type { AppRouter } from "../server/app";

import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { Route, Router, Routes } from "@solidjs/router";
import AppHome from "./pages/AppHome/AppHome";
import Default from "./pages/Default/Default";

const App: Component = () => {
  onMount(async () => { });

  return (
    <Router>
      <Routes>
        <Route path="/" component={Default} />
        <Route path="/app" component={AppHome} />
      </Routes>
    </Router>
  );
};

export default App;
