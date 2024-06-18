import * as logger from 'firebase-functions/logger';
import { z } from 'zod';
import { isAuthenticated } from './middleware';
import { publicProcedure, router } from './trpc';

const protectedProcedure = publicProcedure.use(isAuthenticated);

export const appRouter = router({
  getUser: publicProcedure.input(z.string()).query((opts) => {
    opts.input; // string
    opts.ctx.auth; // AuthData | undefined
    opts.ctx.rawRequest; // Request

    logger.info('Hello logs!', { structuredData: true });

    return { id: opts.input, name: 'Bilbo' };
  }),

  deleteUser: protectedProcedure.input(z.string()).mutation((opts) => {
    opts.input; // string
    opts.ctx.auth; // AuthData

    logger.info('Deleted User!', { userId: opts.input });
  }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
