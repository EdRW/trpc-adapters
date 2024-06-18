import type express from 'express';
import { getAuth } from 'firebase-admin/auth';
import * as logger from 'firebase-functions/logger';
import type { CallableRequest } from 'firebase-functions/v2/https';

type AuthData = CallableRequest['auth'];

/**
 * Verifies the Firebase ID token passed in the Authorization header.
 * If the token is valid, return it, otherwise return undefined.
 *
 * This is meant to verify ID tokens that come from the client SDKs,
 * not the custom tokens that you create with the Admin SDKs
 *
 * See {@link https://firebase.google.com/docs/auth/admin/verify-id-tokens | Verify ID Tokens}
 * for code samples and detailed documentation.
 *
 * This example is based on the internal implementation of the
 * {@link https://github.com/firebase/firebase-functions/blob/9c818713db511895a33378859ab1b9f2eef99179/src/common/providers/https.ts#L599|checkAuthToken }
 * function in the Firebase Functions SDK.
 */
export async function firebaseUserAuth(req: express.Request) {
  try {
    const authorization = req.header('Authorization');
    if (!authorization) {
      logger.debug('No Authorization header');
      return;
    }

    const match = authorization.match(/^Bearer (.*)$/i);
    if (!match || !match[1]) {
      logger.debug('No Bearer token');
      return;
    }

    const idToken = match[1];
    const token = await getAuth().verifyIdToken(idToken);
    const uid = token.uid;

    return {
      uid,
      token,
    } satisfies AuthData;
  } catch (error) {
    logger.debug('Could not verify id token', error);
    return;
  }
}
