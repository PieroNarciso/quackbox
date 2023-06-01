import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import { resolve } from 'path';

export default defineConfig({
  plugins: [solidPlugin()],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
  resolve: {
    alias: {
      "@client": resolve(__dirname, "./src/client"),
      "@server": resolve(__dirname, "./src/server"),
      "@components": resolve(__dirname, "./src/client/components"),
    }
  }
});
