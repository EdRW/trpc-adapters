import { http, HttpFunction } from '@google-cloud/functions-framework';
import { getFunction } from '@google-cloud/functions-framework/testing';
import { initTRPC } from '@trpc/server';
import express from 'express';
import request from 'supertest';
import { createCloudFunctionHandler } from '..';

const t = initTRPC.create();
const data = { message: 'ok' };
const router = t.router({
  getUser: t.procedure.query(() => {
    return data;
  }),
});

describe('trpc-google-cloud-functions', () => {
  it('has createCloudFunctionHandler function', () => {
    expect(createCloudFunctionHandler).toBeDefined();
  });
});

describe('createCloudFunctionHandler', () => {
  it('should return a handler function that takes 2 arguments', () => {
    const handler = createCloudFunctionHandler({
      router,
    });

    expect(handler).toBeInstanceOf(Function);
    expect(handler.length).toBe(2);
  });
});

describe('google cloud function', () => {
  const functionName = 'getUser';
  const handler = createCloudFunctionHandler({
    router,
  });
  http(functionName, handler);
  // get the function using the name it was registered with
  const getUser = getFunction(functionName) as HttpFunction;

  const app = express();
  app.use(getUser);

  it('can handle request', async () => {
    expect(getUser).toBeDefined();
    expect(getUser).toBeInstanceOf(Function);

    const response = await request(app).get('/getUser');

    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.status).toEqual(200);
    expect(response.body).toMatchObject({
      result: { data },
    });
  });
});
