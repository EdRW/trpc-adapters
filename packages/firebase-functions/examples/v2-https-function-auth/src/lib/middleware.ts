import { TRPCError } from '@trpc/server';
import { middleware } from './trpc';

export const isAuthenticated = middleware(async (opts) => {
  const { ctx, next } = opts;

  // `ctx.auth` is possibly undefined
  if (!ctx.auth) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  return next({
    ctx: {
      auth: ctx.auth, // known to be defined now
    },
  });
});
