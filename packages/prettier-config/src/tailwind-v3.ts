import type { Config } from "prettier";
import type { PluginOptions } from "prettier-plugin-tailwindcss";

import baseConfig from "./index.js";

/**
 * ### Tailwind V3 Prettier Configuration
 *
 * This configuration extends the base Prettier config with
 * settings tailored for frontend projects using Tailwind CSS v3.
 *
 * - **Tailwind v3:**
 *   Ensure your project uses Tailwind version 3.
 * - **Tailwind config location:**
 *   By default, expects your Tailwind stylesheet at `./tailwind.config.js`.
 *
 * ### Usage
 * In your project's `package.json`:
 * ```json
 * {
 *   "prettier": "@ostermann/prettier-config/tailwind-v3"
 * }
 * ```
 *
 * ### Customization
 * If you need to override any options (such as the Tailwind stylesheet path),
 * create a `prettier.config.js` file in your project and spread the frontend config:
 *
 * ```js
 * // prettier.config.js
 * import tailwindv3Config from "@ostermann/prettier-config/tailwind-v3";
 *
 * export default {
 *   ...frontendConfig,
 *   // override as needed
 *   tailwindConfig: "./custom/path/to/tailwind.config.js",
 * };
 * ```
 */
export const tailwindV3Config: Config & PluginOptions = {
  ...baseConfig,
  /* Tailwind */
  plugins: [...(baseConfig.plugins ?? []), "prettier-plugin-tailwindcss"],
  tailwindConfig: "./tailwind.config.js",
  tailwindAttributes: ["class", "className", "tw"],
  tailwindFunctions: ["classnames", "clsx", "cn", "cva", "tv"],
};

export default tailwindV3Config;
