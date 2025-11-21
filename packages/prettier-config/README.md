# Prettier Configuration

This is a group of shareable Prettier configurations.

## Usage

### Install the npm package in your repository

```bash
npm install --save-dev --save-exact @ostermann/prettier-config
```

### Install dependencies in your repository

These should be installed automatically with the package installation,
but it is useful to have `prettier` and `prettier-plugin-tailwindcss`
installed to allow for overriding the configuration.

```bash
npm install --save-dev prettier prettier-plugin-tailwindcss
```

### Use the base config

In your project's `package.json`:

```json
{
  "prettier": "@ostermann/prettier-config"
}
```

Or using a specific configuration:

```json
{
  "prettier": "@ostermann/prettier-config/frontend"
}
```

### Override the base config in your own project

If you want to extend or override the base config, create a `prettier.config.js` file in your project:

```js
// prettier.config.js
import baseConfig from "@ostermann/prettier-config";

export default {
  ...baseConfig,
  // Your overrides here
  printWidth: 100,
};
```

> **Note:** If you use a `prettier.config.js` file with `import`, your project must have `"type": "module"` in its `package.json`.

---

## Contributing

### Get started

1. Install dependencies

```bash
npm install --workspace @ostermann/prettier-config
```

2. Build the project

```bash
npm run build --workspace @ostermann/prettier-config
```

### Creating or updating a config

1. Create or update the prettier configuration
2. Update the version in [package.json](./package.json)
3. Update the [CHANGELOG](./CHANGELOG.md)
4. Run the build
5. Deploy the package

---

## External Links

- [Prettier](https://prettier.io/docs/sharing-configurations)
