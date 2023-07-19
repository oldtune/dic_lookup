import { defineConfig } from 'astro/config';
import react from "@astrojs/react";

import deno from "@astrojs/deno";

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  output: "server",
  adapter: deno()
});