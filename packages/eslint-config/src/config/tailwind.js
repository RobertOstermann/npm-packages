import { defineConfig } from "eslint/config";
import tailwindPlugin from "eslint-plugin-better-tailwindcss";

import { commonIgnores } from "../utilities/utilities.js";

/**
 * @typedef {Object} BetterTailwindProps
 * @property {string|undefined} entryPoint
 * @property {string|undefined} tailwindConfig
 *
 * @typedef {BetterTailwindProps | undefined} Props
 */

/**
 * ### Tailwind ESLint Configuration
 *
 * This configuration configures ESLint for use in project
 * with a Tailwind setup.
 *
 *
 * This eslint config expects the tailwind stylesheet to be located at `src/styles/tailwind.css`.
 * The stylesheet or tailwind config can be customized.
 *
 * ### Usage
 * Create an `eslint.config.js` file in your project:
 *
 * ```js
 * import { defineConfig } from "eslint/config";
 *
 * import { baseConfig, tailwindConfig } from "@ostermann/eslint-config";
 *
 * export default defineConfig({
 *   extends: [baseConfig, tailwindConfig({ entryPoint: "src/styles/tailwind.css" })],
 * });
 * ```
 *
 * @param {Props} [props]
 */
export const tailwindConfig = (props) =>
  defineConfig([
    commonIgnores,
    {
      files: ["**/*.ts", "**/*.tsx"],
      plugins: {
        "better-tailwindcss": tailwindPlugin,
      },
      settings: {
        react: {
          version: "detect",
        },
        "better-tailwindcss": props
          ? props
          : {
              entryPoint: "src/styles/tailwind.css",
            },
      },
      languageOptions: {
        parserOptions: {
          projectService: true,
          tsconfigRootDir: import.meta.dirname,
          ecmaFeatures: {
            jsx: true,
          },
        },
      },
      rules: {
        // better-tailwindcss
        "better-tailwindcss/enforce-consistent-variable-syntax": "error",
        "better-tailwindcss/enforce-shorthand-classes": "error",
      },
    },
  ]);
