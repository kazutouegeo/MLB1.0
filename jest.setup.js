// Jest setup file
jest.setTimeout(10000);

// Global test variables
process.env.NODE_ENV = 'test';
process.env.PORT = '3000';

// Suppress console logs during tests unless DEBUG is set
if (!process.env.DEBUG) {
  console.log = jest.fn();
  console.info = jest.fn();
  console.warn = jest.fn();
}