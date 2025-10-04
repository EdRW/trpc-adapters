import type { AnyRouter } from '@trpc/server';
import type {
  NodeHTTPCreateContextFnOptions,
  NodeHTTPHandlerOptions,
} from '@trpc/server/adapters/node-http';
import { nodeHTTPRequestHandler } from '@trpc/server/adapters/node-http';
import type express from 'express';
import type { Request } from 'firebase-functions/v2/https';

export type CreateFirebaseHandlerOptions<TRouter extends AnyRouter> =
  NodeHTTPHandlerOptions<TRouter, Request, express.Response>;

export type FirebaseOnErrorFunction<TRouter extends AnyRouter> =
  CreateFirebaseHandlerOptions<TRouter>['onError'];

export type CreateFirebaseContextOptions = NodeHTTPCreateContextFnOptions<
  Request,
  express.Response
>;

export type OnRequestHandler = (
  request: Request,
  response: express.Response,
) => void | Promise<void>;

export function createFirebaseHandler<TRouter extends AnyRouter>(
  opts: CreateFirebaseHandlerOptions<TRouter>,
): OnRequestHandler {
  return async (req: Request, res: express.Response) => {
    const endpoint = req.path.slice(1);

    await nodeHTTPRequestHandler({
      // FIXME: no typecasting should be needed here
      ...(opts as CreateFirebaseHandlerOptions<AnyRouter>),
      req,
      res,
      path: endpoint,
    });
  };
}
