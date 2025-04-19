/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  moduleNameMapper: {
    // Handle module aliases (adjust if you have different aliases)
    '^@/(.*)$': '<rootDir>/src/$1',
    // Handle CSS Modules (if you use them)
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', 
  },
  // Optional: Ignore specific directories if needed
  // testPathIgnorePatterns: ['/node_modules/', '/dist/'], 
};
