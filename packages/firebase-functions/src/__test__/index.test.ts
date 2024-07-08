import { initTRPC } from '@trpc/server';
import express from 'express';
import { onRequest as onRequestV1 } from 'firebase-functions/v1/https';
import {
  onRequest as onRequestV2,
  type Request,
} from 'firebase-functions/v2/https';
import request from 'supertest';
import { createFirebaseHandler } from '..';

const t = initTRPC.create();
const data = { message: 'ok' };
const router = t.router({
  getUser: t.procedure.query(() => {
    return data;
  }),
});

describe('trpc-firebase-functions', () => {
  it('has createFirebaseHandler function', () => {
    expect(createFirebaseHandler).toBeDefined();
  });
});

describe('createFirebaseHandler', () => {
  it('should return a handler function that takes 2 arguments', () => {
    const handler = createFirebaseHandler({
      router,
    });

    expect(handler).toBeInstanceOf(Function);
    expect(handler.length).toBe(2);
  });
});

describe('firebase onRequest function V1', () => {
  const handler = createFirebaseHandler({
    router,
  });
  const app = express();
  app.use((req, res) => {
    const _req = req as Request;
    _req.rawBody = Buffer.from('');

    const result = onRequestV1(handler)(_req, res);
    if (result) {
      result.catch((err) => {
        res.status(500).send(err);
        throw err;
      });
    }
  });

  it('can handle request', async () => {
    const response = await request(app).get('/getUser');

    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.status).toEqual(200);
    expect(response.body).toMatchObject({
      result: { data },
    });
  });
});

describe('firebase onRequest function V2', () => {
  const handler = createFirebaseHandler({
    router,
  });
  const app = express();
  app.use((req, res) => {
    const _req = req as Request;
    _req.rawBody = Buffer.from('');

    const result = onRequestV2(handler)(_req, res);
    if (result) {
      result.catch((err) => {
        res.status(500).send(err);
        throw err;
      });
    }
  });

  it('can handle request', async () => {
    const response = await request(app).get('/getUser');

    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.status).toEqual(200);
    expect(response.body).toMatchObject({
      result: { data },
    });
  });
});
