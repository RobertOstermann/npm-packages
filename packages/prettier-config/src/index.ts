import type { Config } from "prettier";

/**
 * ### Default Prettier Configuration
 *
 * This configuration contains the base prettier setup.
 *
 * ### Usage
 * In your project's `package.json`:
 * ```json
 * {
 *   "prettier": "@ostermann/prettier-config"
 * }
 * ```
 *
 * ### Customization
 * If you need to override any options,
 * create a `prettier.config.js` file in your project and spread the frontend config:
 *
 * ```js
 * // prettier.config.js
 * import prettierConfig from "@ostermann/prettier-config";
 *
 * export default {
 *   ...prettierConfig,
 *   // override as needed
 *   printWidth: 100,
 * };
 * ```
 *
 * @see https://prettier.io/docs/options
 */
const config: Config = {
  /* Formatting */
  printWidth: 80,
  tabWidth: 2,
  /* Plugins */
  plugins: ["prettier-plugin-ignored", "prettier-plugin-packagejson"],
  /* File and folder overrides */
  overrides: [
    {
      files: [
        /* Lock files */
        "bun.lock",
        "package-lock.json",
        "pnpm-lock.yaml",
        "yarn.lock",
        /* GitHub files */
        ".github/CODEOWNERS",
      ],
      options: {
        parser: "ignored",
      },
    },
  ],
};

export default config;
