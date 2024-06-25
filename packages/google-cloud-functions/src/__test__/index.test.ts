import { createCloudFunctionHandler } from '..';

describe('trpc-firebase-functions', () => {
  it('has createFirebaseHandler function', () => {
    expect(createCloudFunctionHandler).toBeDefined();
  });
});
