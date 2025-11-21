# ESLint Configuration

This is a group of shareable ESLint configurations.

## Usage

### Install the npm package in your repository

```bash
npm install --save-dev --save-exact @ostermann/eslint-config
```

### Install dependencies in your repository

These should be installed automatically with the package installation,
but it is useful to have `@eslint/js` and `eslint`
installed to allow for overriding the configuration.

```bash
npm install --save-dev @eslint/js eslint
```

### Use the base config

Create an `eslint.config.js` file in your project:

```js
import { defineConfig } from "eslint/config";

import { baseConfig } from "@ostermann/eslint-config";

export default defineConfig({
  extends: [baseConfig],
});
```

Or using a specific configuration:

```js
import { defineConfig } from "eslint/config";

import { baseConfig, tanstackRouterConfig } from "@ostermann/eslint-config";

export default defineConfig({
  extends: [baseConfig, tanstackRouterConfig],
});
```

### Override the base config in your own project

```js
import { defineConfig } from "eslint/config";

import { baseConfig } from "@ostermann/eslint-config";

export default defineConfig(
  {
    extends: [baseConfig],
  },
  // Your overrides here
  {
    files: ["**/*"],
    rules: {
      // import
      "import/no-default-export": "off",
    },
  },
);
```

---

## Contributing

### Get started

1. Install dependencies

```bash
npm install --workspace @ostermann/eslint-config
```

2. Build the project

```bash
npm run build --workspace @ostermann/eslint-config
```

### Creating or updating a config

1. Create or update the eslint configuration
2. Run the `npm run barrelize --workspace @ostermann/eslint-config` command.
   This will update the [index.js](./src/index.js) to export the updated configuration.
3. Update the version in [package.json](./package.json)
4. Update the [CHANGELOG](./CHANGELOG.md)
5. Run the build
6. Deploy the package

---

## External Links

- [ESLint](https://eslint.org/docs/latest/extend/shareable-configs)
