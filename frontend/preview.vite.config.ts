import { defineConfig } from "vite";
import defaultConfig from "./vite.config";

export default defineConfig({
  ...defaultConfig,
  server: {
    port: Number(process.env.AMPLICODE_PREVIEW_PORT),
  },
  define: {
    "process.env.REACT_APP_IDE_DEVMODE": `"${process.env.REACT_APP_IDE_DEVMODE}"`,
  },
});
