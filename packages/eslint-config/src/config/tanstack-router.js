/* eslint-disable no-useless-escape */
import tanstackRouterPlugin from "@tanstack/eslint-plugin-router";
import { defineConfig } from "eslint/config";
import simpleImportSortPlugin from "eslint-plugin-simple-import-sort";

import { commonIgnores } from "../utilities/utilities.js";

/**
 * ### TanStack Router ESLint Configuration
 *
 * This configuration configures ESLint for use in project
 * with a TanStack Router setup.
 *
 * This eslint config expects a specific routes directory in
 * the `tanstackRouter` plugin in `vite.config.ts` to work correctly.
 *
 * ```js
 * // vite.config.ts
 * plugins: [
      tanstackRouter({
        target: "react",
        routesDirectory: "./src/router/routes",
      }),
    ]
 * ```
 *
 * This eslint config works well with a route alias setup in the `tsconfig.json` file.
 *
 * ```json
 * {
 *   "compilerOptions": {
 *     "paths": {
 *       "@routes/*": ["./src/router/routes/{-$locale}/*"],
 *       "@/*": ["./src/*"]
 *     },
 *   }
 * }
 * ```
 *
 * ### Usage
 * Create an `eslint.config.js` file in your project:
 *
 * ```js
 * import { defineConfig } from "eslint/config";
 *
 * import { baseConfig, tanstackRouterConfig } from "@ostermann/eslint-config";
 *
 * export default defineConfig({
 *   extends: [baseConfig, tanstackRouterConfig],
 * });
 * ```
 */
export const tanstackRouterConfig = defineConfig(
  commonIgnores,
  // Rules for all js/ts files
  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    plugins: {
      "simple-import-sort": simpleImportSortPlugin,
    },
    languageOptions: {
      sourceType: "module",
    },
    rules: {
      // simple-import-sort
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            // Side effect imports
            ["^\\u0000"],
            // React imports and packages
            ["React", "^react", "^@?\\w"],
            // Router paths
            ["^(router|@routes|@/router)(/.*|$)"],
            // Path aliases and relative paths (exclude svg paths)
            ["^(@)(/.*)(?<!\\.svg)$", "^\\."],
            ["^(@)(/.*)\\.svg$", "^\\."],
            // Styles and images
            ["(\\.)(s?css|png|svg|otf)$"],
          ],
        },
      ],
      "simple-import-sort/exports": "error",
    },
  },
  // Rules for all ts files
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      "@tanstack/router": tanstackRouterPlugin,
    },
    settings: {
      react: {
        version: "detect",
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
      // @tanstack
      "@tanstack/router/create-route-property-order": "error",
    },
  },
  // Enforce route specific filename conventions
  {
    files: ["src/router/routes/**/*.tsx"],
    ignores: [
      // Folders starting with `-` are not routes.
      "**/routes/**/-*/**/*",
      "**/routes/**/-*",
      // Files starting with _ are pathless layout routes.
      "**/routes/**/_*",
    ],
    rules: {
      // check-file
      "check-file/filename-naming-convention": [
        "error",
        {
          "**/*.{jsx,tsx}": "KEBAB_CASE",
        },
        {
          errorMessage:
            'The filename "{{ target }}" does not match the "{{ pattern }}" pattern. See the README for details',
        },
      ],
      "check-file/folder-naming-convention": [
        "error",
        {
          // This regex allows for kebab-case, folders starting with underscore, and folders wrapped in parenthesis
          // Folders starting with $ and using snake_case are also allowed
          "src/router/routes/\\{\\-$locale\\}/**/":
            "{\\(,_,\\$,[a-z]}*([a-z\\-\\_]){\\),_,[a-z]}",
        },
        {
          errorMessage:
            'The folder name "{{ target }}" does not match the "KEBAB_CASE" pattern. See the README for details',
          ignoreWords: ["{-$locale}"],
        },
      ],
    },
  },
  // Disable filename conventions
  {
    files: [
      // Disable filename conventions for routes
      "src/router/router.tsx",
      "src/router/routes/__root.tsx",
      // Redirect routes from the old app
      "**/routes/**/\(redirect\)/**/*",
      // Files starting with +layout are layout routes.
      "**/routes/**/\+layout.tsx",
      // Files starting with +page are index routes.
      "**/routes/**/\+page.tsx",
      // Files starting with $ are parameter routes.
      "**/routes/**/\$*.tsx",
    ],
    rules: {
      // check-file
      "check-file/filename-naming-convention": "off",
    },
  },
);
