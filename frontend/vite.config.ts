import react from "@vitejs/plugin-react";
import * as fs from "node:fs";
import * as path from "node:path";
import { defineConfig } from "vite";

const PORT = "8080";
const SERVER_URL = "http://localhost";
const BASE_URL = process.env.BASE_URL ?? "/";
// Do not inline or change this variable as it can be changed by Amplicode Studio code generation.
const AMPLICODE_ENDPOINTS = "graphql|login|logout|rest";

/**
 * Aliases should be configured, when app is used as example app
 * in addon development workspace.
 * In this case we need manually point addon's "@amplicode-addon/gql"
 * import aliases to addon `src/*` folder.
 * This manual config required because addon `src/` folder located
 * outside vite application.
 *
 * If app not used inside addon development monorepo (the most common case),
 * function returns empty object.
 */
function findAddonAlias(): Record<string, string> {
  // alias for `@amplicode-addon` imports
  const alias: Record<string, string> = {};
  // directory where addon could be located in workspace
  const packagesDir: string = path.join(__dirname, "..", "packages");
  // search alias `@amplicode-addon/gql` in addon package in workspace
  if (fs.existsSync(packagesDir) && fs.lstatSync(packagesDir).isDirectory()) {
    fs.readdirSync(packagesDir).find((addonDir: string) => {
      const packageJsonPath: string = path.join(packagesDir, addonDir, "package.json");
      if (fs.existsSync(packageJsonPath)) {
        const packageJson: string = fs.readFileSync(packageJsonPath, "utf-8");
        if (packageJson.includes(`"@amplicode-addon/gql"`)) {
          const aliasPath: string = path.join(packagesDir, addonDir, "src", "gql");
          alias["@amplicode-addon/gql"] = aliasPath;
          console.log(`vite config: added alias "@amplicode-addon/gql":"${aliasPath}" `);
        }
      }
      // stop search alias if at least one found
      return Object.keys(alias).length > 0;
    });
  }
  return alias;
}

export default defineConfig({
  assetsInclude: ["**/*.graphql"],
  plugins: [react()],
  base: `${BASE_URL}`,
  resolve: { alias: findAddonAlias() },
  build: {
    rollupOptions: {
      // exclude unnecessary demoThemeConfig from production
      external: [/demoThemeConfig/],
    },
    target: "es2022",
  },
  server: {
    proxy: {
      [`^/(${AMPLICODE_ENDPOINTS})`]: `${SERVER_URL}:${PORT}`,
    },
  },
});
