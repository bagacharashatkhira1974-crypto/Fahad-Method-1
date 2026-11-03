import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { nitro } from "nitro/vite";

export default defineConfig(({ command }) => ({
  plugins: [
    tsConfigPaths(),
    tanstackStart({
      // Use src/server.ts as the SSR entry (error-handling wrapper).
      server: { entry: "server" },
    }),
    viteReact(),
    tailwindcss(),
    // Production build only. Change the preset here if you deploy somewhere specific
    // (e.g. nitro({ preset: "vercel" }) or nitro({ preset: "cloudflare_module" })).
    ...(command === "build" ? [nitro()] : []),
  ],
  resolve: {
    dedupe: ["react", "react-dom", "@tanstack/react-router", "@tanstack/react-start"],
  },
}));
