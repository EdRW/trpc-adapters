const sharedConfig = require('@trpc-adapters/jest-config');

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  ...sharedConfig,
  roots: ['<rootDir>'],
};
