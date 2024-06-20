# trpc-google-cloud-functions

## Description

End-to-end type safety for your Google Cloud functions.
This adapter allows you to plug in a [tRPC](https://trpc.io/) router as a request handler for HTTP Google Cloud functions.

This package has the following peer dependencies:

- `@trpc/server`
- `@google-cloud/functions-framework`

Features

- ✅ tRPC v10 support
- 🚧 tRPC v11 support

## Installation

npm

```bash
npm install trpc-google-cloud-functions
```

Yarn

```bash
yarn add trpc-google-cloud-functions
```

pnpm

```bash
pnpm add trpc-google-cloud-functions
```

## Quickstart

```typescript
import { createCloudFunctionHandler } from 'trpc-google-cloud-functions';
import { initTRPC } from '@trpc/server';
import * as functions from '@google-cloud/functions-framework';

const t = initTRPC.create();

// create a trpc router
const router = t.router({
  healthCheck: t.procedure.query(() => ({ status: 'ok' })),
});

// use the Google Cloud functions adapter
const handler = createCloudFunctionHandler({ router });

// register helloWorld cloud function
functions.http('helloWorld', handler);
```

## Usage

### 1. Creating the context (optional)

Use the `CreateCloudFunctionContextOptions` type that comes in this package.
While creating the context, you have access to the `request` and `response` objects.
The context can be used to hold things that your procedures should have access to, like user authentication or db connection.

```typescript
import type { CreateCloudFunctionContextOptions } from 'trpc-google-cloud-functions';

// created for each request
export const createContext = async ({
  req,
  res,
}: CreateCloudFunctionContextOptions) => {
  // do things like get user Auth token from header and verify it.
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

This adapter is for HTTP Google Cloud functions.
It converts your router into a request handler that can be passed directly to the `http` function.

```typescript
import { createCloudFunctionHandler } from 'trpc-google-cloud-functions';
import * as functions from '@google-cloud/functions-framework';

const handler = createCloudFunctionHandler({
  router: appRouter,
  createContext,
});

// register helloWorld cloud function
functions.http('helloWorld', handler);
```

## Examples

Check out the example projects linked below for more.

- [Basic Example Project](./examples/http-function/)
