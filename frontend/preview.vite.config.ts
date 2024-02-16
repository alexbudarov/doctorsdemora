import { HtmlTagDescriptor, PluginOption, defineConfig, mergeConfig } from "vite";
import defaultConfig from "./vite.config";

function injectHtml(tags: HtmlTagDescriptor[]): PluginOption {
  return {
    name: "inject-html",
    transformIndexHtml(html: string) {
      return {
        html,
        tags,
      };
    },
  };
}

const previewConfig = defineConfig({
  server: {
    port: Number(process.env.AMPLICODE_PREVIEW_PORT),
  },
  define: {
    "process.env.REACT_APP_IDE_DEVMODE": `"${process.env.REACT_APP_IDE_DEVMODE}"`,
  },
  ...(process.env.REACT_APP_IDE_DEVMODE && {
    plugins: [
      injectHtml([
        {
          injectTo: "body",
          tag: "script",
          children: 'window.parent.postMessage("Preview is ready", "*")',
        },
      ]),
    ],
  }),
});

export default mergeConfig(defaultConfig, previewConfig);
