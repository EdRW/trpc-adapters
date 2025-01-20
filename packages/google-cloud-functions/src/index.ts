import type {
  HttpFunction,
  Request,
  Response,
} from '@google-cloud/functions-framework';
import type { AnyRouter } from '@trpc/server';
import type {
  NodeHTTPCreateContextFnOptions,
  NodeHTTPHandlerOptions,
} from '@trpc/server/adapters/node-http';
import { nodeHTTPRequestHandler } from '@trpc/server/adapters/node-http';

export type CreateCloudFunctionHandlerOptions<TRouter extends AnyRouter> =
  NodeHTTPHandlerOptions<TRouter, Request, Response>;

export type CloudFunctionOnErrorFunction<TRouter extends AnyRouter> =
  CreateCloudFunctionHandlerOptions<TRouter>['onError'];

export type CreateCloudFunctionContextOptions = NodeHTTPCreateContextFnOptions<
  Request,
  Response
>;

export type OnRequestHandler = (
  request: Request,
  response: Response,
) => void | Promise<void>;

export function createCloudFunctionHandler<TRouter extends AnyRouter>(
  opts: CreateCloudFunctionHandlerOptions<TRouter>,
): HttpFunction {
  return async (req: Request, res: Response) => {
    const endpoint = req.path.slice(1);

    await nodeHTTPRequestHandler({
      // FIXME: no typecasting should be needed here
      ...(opts as CreateCloudFunctionHandlerOptions<AnyRouter>),
      req,
      res,
      path: endpoint,
    });
  };
}
