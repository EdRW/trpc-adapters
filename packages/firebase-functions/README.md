# trpc-firebase-functions 🔥

**End-to-end type safety for your Firebase functions with tRPC.**

## Description

This adapter allows you to plug in a [tRPC](https://trpc.io/) router as a request handler for v1 and v2 HTTP `onRequest` [Firebase functions](https://firebase.google.com/docs/functions).

This package has the following peer dependencies:

- `@trpc/server`
- `firebase-functions`

### Features

- ✅ `onRequest` Firebase functions support
- ✅ tRPC v10 support
- 🚧 for tRPC v11 support, try using [`trpc-firebase-functions@next`](https://www.npmjs.com/package/trpc-firebase-functions/v/next)
- 🤔 `onCall` Firebase functions support. If you need this, please consider opening and issue or a PR.

Special thanks to the folks in the [Integration with firebase functions? #1263](https://github.com/trpc/trpc/discussions/1263) discussion thread for working out how a Firebase functions adapter could be built.

## Installation

npm

```bash
npm install trpc-firebase-functions
```

Yarn

```bash
yarn add trpc-firebase-functions
```

pnpm

```bash
pnpm add trpc-firebase-functions
```

## Quickstart

```typescript
import { createFirebaseHandler } from 'trpc-firebase-functions';
import { initTRPC } from '@trpc/server';
import { onRequest } from 'firebase-functions/v2/https';

const t = initTRPC.create();

// create a trpc router
const router = t.router({
  healthCheck: t.procedure.query(() => ({ status: 'ok' })),
});

// use the firebase functions adapter
const handler = createFirebaseHandler({ router });

export const helloWorld = onRequest(handler);
```

## Usage

### 1. Creating the context (optional)

Use the `CreateFirebaseContextOptions` type that comes in this package.
While creating the context, you have access to the `request` and `response` objects.
The context can be used to hold things that your procedures should have access to, like user authentication or the Firestore client.

```typescript
import type { CreateFirebaseContextOptions } from 'trpc-firebase-functions';

// created for each request
export const createContext = async ({
  req,
  res,
}: CreateFirebaseContextOptions) => {
  // do things like get user Auth token from header and verify it.
  // see authentication example project for one way to do it
};

export type Context = Awaited<ReturnType<typeof createContext>>;
```

### 2. Initializing tRPC and create router

Use the `initTRPC` builder function to initialize tRPC.
If using a context, make sure to pass the context type to the `.context()` function before calling the `.create()` function.

```typescript
import { initTRPC } from '@trpc/server';

const t = initTRPC.context<Context>().create();
// const t = initTRPC.create(); // without a context

const appRouter = t.router({
  // [...]
});
```

### 3. Use the adapter

This adapter is for HTTP (`onRequest`) Firebase functions.
It converts your router into a request handler that can be passed directly to the `onRequest` function.

```typescript
import { onRequest } from 'firebase-functions/v2/https';
import { createFirebaseHandler } from 'trpc-firebase-functions';

const handler = createFirebaseHandler({
  router: appRouter,
  createContext,
});

export const helloWorld = onRequest(handler);
```

## Examples

Check out the example projects linked below for more.

- [Basic Example Project](./examples/v2-https-function/)
- [Authentication Example Project](./examples/v2-https-function-auth/)
