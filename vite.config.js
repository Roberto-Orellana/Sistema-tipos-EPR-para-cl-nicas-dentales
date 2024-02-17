import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA} from "vite-plugin-pwa";

const manifestForPlugin = {
  registerType: "prompt",
  includeAssets: ["logo.png"],
  manifest: {
    name: "PWS-IS",
    short_name: "PWA-IS",
    description: "Proyecto industria de software",
    icons: [
      {
        src: "/logo1.jpg",
        sizes: "192x192",
        type: "image/png",
      },
    ],
    theme_color: "#FFFFFF",
    background_color: "#000000",
    display: "standalone",
    scope: "/",
    start_url: "/",
    orientation: "portrait",
  },
};

// https://vitejs.dev/config/
export default defineConfig({
	base: "./",
	plugins: [react(), VitePWA(manifestForPlugin)],
});