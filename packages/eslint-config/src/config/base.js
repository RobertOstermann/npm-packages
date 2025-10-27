import eslint from "@eslint/js";
import tanstackQueryPlugin from "@tanstack/eslint-plugin-query";
import { defineConfig } from "eslint/config";
import checkFilePlugin from "eslint-plugin-check-file";
import i18next from "eslint-plugin-i18next";
import importPlugin from "eslint-plugin-import";
import noRelativeImportPaths from "eslint-plugin-no-relative-import-paths";
import prettierPluginRecommended from "eslint-plugin-prettier/recommended";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import simpleImportSortPlugin from "eslint-plugin-simple-import-sort";
import tseslint from "typescript-eslint";

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
 *       "@/*": ["./src/*"]
 *     },
 *   }
 * }
 * ```
 *
 * This eslint config expects shadcn components to be in the `src/components/shadcn` directory.
 *
 * ### Usage
 * Create an `eslint.config.js` file in your project:
 *
 * ```js
 * import { defineConfig } from "eslint/config";
 *
 * import { baseConfig } from "@ostermann/eslint-config";
 *
 * export default defineConfig({
 *   extends: [baseConfig],
 * });
 * ```
 */
export const baseConfig = defineConfig(
  commonIgnores,
  eslint.configs.recommended,
  i18next.configs["flat/recommended"],
  prettierPluginRecommended,
  /* Rules for all js/ts files */
  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    plugins: {
      "no-relative-import-paths": noRelativeImportPaths,
      "simple-import-sort": simpleImportSortPlugin,
      import: importPlugin,
    },
    languageOptions: {
      sourceType: "module",
    },
    rules: {
      // import
      "import/consistent-type-specifier-style": ["error", "prefer-top-level"],
      "import/first": "error",
      "import/newline-after-import": "error",
      "import/no-cycle": [
        "error",
        {
          maxDepth: 10,
          ignoreExternal: true,
        },
      ],
      "import/no-default-export": "error",
      "import/no-duplicates": "error",
      "import/no-empty-named-blocks": "error",
      // no-relative-import-paths
      "no-relative-import-paths/no-relative-import-paths": [
        "warn",
        { allowSameFolder: true, rootDir: "src", prefix: "@" },
      ],
      // simple-import-sort
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
    },
  },
  /* Rules for all ts files */
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      "@tanstack/query": tanstackQueryPlugin,
      "check-file": checkFilePlugin,
      "react-hooks": reactHooksPlugin,
      "simple-import-sort": simpleImportSortPlugin,
    },
    extends: [
      tseslint.configs.eslintRecommended,
      tseslint.configs.recommended,
      reactPlugin.configs.flat.recommended,
      reactPlugin.configs.flat["jsx-runtime"],
    ],
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
      "@tanstack/query/exhaustive-deps": "error",
      "@tanstack/query/no-rest-destructuring": "error",
      "@tanstack/query/no-unstable-deps": "error",
      "@tanstack/query/stable-query-client": "error",
      // typescript-eslint
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/consistent-type-exports": "error",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          disallowTypeAnnotations: true,
          fixStyle: "separate-type-imports",
        },
      ],
      // "@typescript-eslint/consistent-type-definitions": "error",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      // check-file
      "check-file/filename-naming-convention": [
        "error",
        {
          "**/*.{jsx,tsx}": "PASCAL_CASE",
          "**/*.{js,ts}": "CAMEL_CASE",
        },
        {
          errorMessage:
            'The filename "{{ target }}" does not match the "{{ pattern }}" pattern. See the README for details',
          ignoreMiddleExtensions: true,
        },
      ],
      // react
      "react/display-name": "off",
      "react/jsx-boolean-value": [
        "error",
        "always",
        { assumeUndefinedIsFalse: false },
      ],
      "react/jsx-curly-brace-presence": "error",
      "react/jsx-uses-react": "error",
      "react/no-children-prop": ["error", { allowFunctions: true }],
      "react/no-unescaped-entities": "off",
      "react/react-in-jsx-scope": "off",
      "react/self-closing-comp": "error",
      // react-hooks
      "react-hooks/exhaustive-deps": "error",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/react-compiler": "off",
      // tsdoc
      eqeqeq: "error",
      "tsdoc/syntax": "off",
      // other
      "no-prototype-builtins": "off",
      // https://typescript-eslint.io/troubleshooting/faqs/eslint/#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
      "no-undef": "off",
      "no-shadow": "off",
      "prefer-const": "warn",
    },
  },
  // Disable filename conventions
  {
    files: [
      "src/main.tsx",
      "src/components/shadcn/**/*",
      "src/types/global/**/*",
      "**/codegen/**/*",
      "**/*.d.ts",
    ],
    rules: {
      // check-file
      "check-file/filename-naming-convention": "off",
    },
  },
  // Disable certain rules for shadcn components
  {
    files: ["src/components/shadcn/**/*"],
    rules: {
      "no-restricted-imports": "off",
      "react/forbid-elements": "off",
    },
  },
  // Allow default exports
  {
    files: ["eslint.config.*", "src/types/global/**/*", "**/codegen/**/*"],
    rules: {
      // import
      "import/no-default-export": "off",
    },
  },
);
