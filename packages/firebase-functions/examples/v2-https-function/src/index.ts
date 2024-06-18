/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { initTRPC } from '@trpc/server';
import * as logger from 'firebase-functions/logger';
import { onRequest } from 'firebase-functions/v2/https';
import {
  CreateFirebaseContextOptions,
  createFirebaseHandler,
} from 'trpc-firebase-functions';
import { z } from 'zod';

// created for each request
const createContext = async ({
  req,
  res,
}: CreateFirebaseContextOptions) => ({});

type Context = Awaited<ReturnType<typeof createContext>>;

const t = initTRPC.context<Context>().create();

const appRouter = t.router({
  getUser: t.procedure.input(z.string()).query((opts) => {
    opts.input; // string

    logger.info('Hello logs!', { structuredData: true });

    return { id: opts.input, name: 'Bilbo' };
  }),
});

// export type definition of API
export type AppRouter = typeof appRouter;

// Create request handler using adapter
const handler = createFirebaseHandler({
  router: appRouter,
  createContext,
});

// Export onRequest Firebase function
export const helloWorld = onRequest(handler);
