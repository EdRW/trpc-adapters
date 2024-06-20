/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/require-await */
import * as functions from '@google-cloud/functions-framework';
import { initTRPC } from '@trpc/server';
import {
  CreateCloudFunctionContextOptions,
  createCloudFunctionHandler,
} from 'trpc-google-cloud-functions';
import { z } from 'zod';

// created for each request
const createContext = async ({
  req,
  res,
}: CreateCloudFunctionContextOptions) => ({});

type Context = Awaited<ReturnType<typeof createContext>>;

const t = initTRPC.context<Context>().create();

const appRouter = t.router({
  getUser: t.procedure.input(z.string()).query((opts) => {
    opts.input; // string

    return { id: opts.input, name: 'Bilbo' };
  }),
});

// export type definition of API
export type AppRouter = typeof appRouter;

// Create request handler using adapter
const handler = createCloudFunctionHandler({
  router: appRouter,
  createContext,
});

// register helloWorld cloud function
functions.http('helloWorld', handler);
