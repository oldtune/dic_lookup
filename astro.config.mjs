import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import deno from "@astrojs/deno";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind()],
  output: "server",
  adapter: deno()
});