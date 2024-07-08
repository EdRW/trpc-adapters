# @trpc-adapters

A monorepo holding [tRPC](https://trpc.io/) adapters for various platforms and frameworks.
With tRPC adapters, you can have end-to-end type safety no matter where your API runs.

## Install

Run the following command from the root directory:

```bash
pnpm install
```

## Packages

This monorepo includes the following packages, which are published to npm:

- [`trpc-firebase-functions`](./packages/firebase-functions/): a tRPC adapter for Firebase functions
- [`trpc-google-cloud-functions`](./packages/google-cloud-functions/): a tRPC adapter for Google cloud functions

It also includes the following internal configuration packages:

- [`@trpc-adapters/eslint-config`](./packages/eslint-config/): `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- [`@trpc-adapters/typescript-config`](./packages/typescript-config/): `tsconfig.json`s used throughout the monorepo

## CLI Commands

The following commands will apply to all apps and packages if run from the root directory.
Alternatively, commands run from individual project directories will only apply to that project.

### Build

```bash
pnpm build
```

### Develop

Start dev servers or file watchers that auto reload on file changes.

```bash
pnpm dev
```

### Lint

```bash
pnpm lint
```

### Format

```bash
pnpm format
```

### Test

```bash
pnpm test
```

## Utilities

Read more about the tooling used in this monorepo:

- [Turborepo](https://turbo.build/repo/): a tool for managing monorepos
- [Changesets](https://github.com/changesets/changesets): a tool for managing changelogs and [semantic versioning](https://semver.org/)
- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting
