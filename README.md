# @trpc-adapters

A monorepo holding [tRPC](https://trpc.io/) adapters for various platforms and frameworks.
With tRPC adapters, you can have end-to-end type safety no matter where your API runs.

## Install

Run the following command from the root directory:

```bash
pnpm install
```

## Packages

This Turborepo includes the following packages:

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

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Remote Caching

Turborepo can use a technique known as [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```bash
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```
npx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)
