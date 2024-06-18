/* eslint-disable @typescript-eslint/no-unused-vars */
import { CreateFirebaseContextOptions } from 'trpc-firebase-functions';
import { firebaseUserAuth } from './auth';

// created for each request
export const createContext = async ({
  req,
  res,
}: CreateFirebaseContextOptions) => {
  const auth = await firebaseUserAuth(req);

  return {
    auth,
    rawRequest: req,
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;
