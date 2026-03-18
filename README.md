# NPM Packages

This repository contains a collection of reusable npm packages
maintained by Robert Ostermann. Each package is designed to be shared across
multiple projects to promote consistency and best practices within the organization.

## Packages

- **@ostermann/eslint-config**  
  Shared ESLint configuration for linting code consistently.
- **@ostermann/prettier-config**  
  Shared Prettier configuration for formatting code consistently.

## Usage

Each package is published independently to npm and can be installed via `npm`:

```sh
npm install --save-dev --save-exact @ostermann/eslint-config
npm install --save-dev --save-exact @ostermann/prettier-config
```

See the documentation of individual packages for their usage.

## Publish

Login

```sh
npm login
```

Publish

```sh
npm publish --workspace @ostermann/eslint-config
npm publish --workspace @ostermann/prettier-config
```

## Docs

- [eslint-config](./packages/eslint-config/README.md)
- [prettier-config](./packages/prettier-config/README.md)

```

```
