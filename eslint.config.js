import { defineConfig } from "eslint/config";

import {
  baseConfig,
  tailwindConfig,
} from "./packages/eslint-config/src/index.js";

export default defineConfig(
  {
    extends: [baseConfig, tailwindConfig()],
  },
  // Allow default exports
  {
    files: ["**/*"],
    rules: {
      // import
      "import/no-default-export": "off",
    },
  },
);
