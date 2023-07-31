import { Outlet } from "@solidjs/router";
import { Component, createSignal } from "solid-js";
import IconMenu from "@components/Icons/IconMenu";
import Drawer from "./Drawer";
import MainPlayer from "./MainPlayer/MainPlayer";

const Layout: Component = () => {
  const [isOpen, setIsOpen] = createSignal(false);

  return (
    <div class="h-screen w-screen">
      <nav class="px-1 py-1">
        <button
          class="px-1 py-1 rounded-full hover:bg-gray-600"
          onclick={() => setIsOpen(true)}
        >
          <IconMenu class="h-8 w-8 text-white fill-current" />
        </button>
      </nav>
      <Drawer isOpen={isOpen()} onClose={() => setIsOpen(false)}>
        Content
      </Drawer>
      <section class="container">
        <Outlet />
      </section>
      <MainPlayer />
    </div>
  );
};

export default Layout;
