import { initializeApp } from 'firebase-admin/app';
import { onRequest } from 'firebase-functions/v2/https';
import { createFirebaseHandler } from 'trpc-firebase-functions';
import { createContext } from './lib/context';
import { appRouter } from './lib/router';

// Initialize Firebase Admin so we can use Firebase Authentication
initializeApp();

// Create request handler using adapter
const handler = createFirebaseHandler({
  router: appRouter,
  createContext,
});

// Export onRequest Firebase function
export const helloWorld = onRequest(handler);
