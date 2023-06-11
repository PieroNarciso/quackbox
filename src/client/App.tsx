import { Component, onMount } from "solid-js";

import { Route, Routes, useNavigate } from "@solidjs/router";
import AppHome from "./pages/AppHome/AppHome";
import Default from "./pages/Default/Default";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from "@server/app";
import Layout from "@components/Layout";

const App: Component = () => {
  const navigate = useNavigate();
  const trpc = createTRPCProxyClient<AppRouter>({
    links: [httpBatchLink({ url: "/trpc" })],
  });

  onMount(async () => {
    const session = await trpc.userSessionStatus.query();
    if (session.active) navigate("/app", { replace: true });
    navigate("/", { replace: true });
  });

  return (
    <Routes>
      <Route path="/" component={Default} />
      <Route path="/app" component={Layout}>
        <Route path="/" component={AppHome} />
      </Route>
    </Routes>
  );
};

export default App;
