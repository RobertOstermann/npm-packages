import type { Config } from "prettier";
import type { PluginOptions } from "prettier-plugin-tailwindcss";

import baseConfig from "./index.js";

/**
 * ### Tailwind V4 Prettier Configuration
 *
 * This configuration extends the base Prettier config with
 * settings tailored for frontend projects using Tailwind CSS v4.
 *
 * - **Tailwind v4:**
 *   Ensure your project uses Tailwind version 4.
 * - **Tailwind stylesheet location:**
 *   By default, expects your Tailwind stylesheet at `./src/styles/tailwind.css`.
 *
 * ### Usage
 * In your project's `package.json`:
 * ```json
 * {
 *   "prettier": "@ostermann/prettier-config/tailwind"
 * }
 * ```
 *
 * ### Customization
 * If you need to override any options (such as the Tailwind stylesheet path),
 * create a `prettier.config.js` file in your project and spread the frontend config:
 *
 * ```js
 * // prettier.config.js
 * import tailwindConfig from "@ostermann/prettier-config/tailwind";
 *
 * export default {
 *   ...tailwindConfig,
 *   // override as needed
 *   tailwindStylesheet: "./custom/path/to/tailwind.css",
 * };
 * ```
 */
export const tailwindConfig: Config & PluginOptions = {
  ...baseConfig,
  /* Tailwind */
  plugins: [...(baseConfig.plugins ?? []), "prettier-plugin-tailwindcss"],
  tailwindStylesheet: "./src/styles/tailwind.css",
  tailwindAttributes: ["class", "className", "tw"],
  tailwindFunctions: ["classnames", "clsx", "cn", "cva", "tv"],
};

export default tailwindConfig;
