// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect'

import { TextEncoder, TextDecoder } from 'util';
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

global.fetch = jest.fn(() => Promise.resolve({
  // TODO: Need refactor.
  json: () => Promise.resolve(null)
}));

jest.mock('framer-motion', () => {
  const actual = jest.requireActual('framer-motion');

  return {
    __esModule: true,
    ...actual,
    AnimatePresence: ({ children, initial, ...props }) => (
      <div {...props} className='mocked-framer-motion-AnimatePresence'>
        { children }
      </div>
    ),
    motion: {
      ...actual.motion,
      div: ({ children, ...props }) => (
        <div {...props} className='mocked-framer-motion-div'>
          { children }
        </div>
      ),
    },
  };
});

jest.mock('./src/firebase/index.ts', () => {
  return {
    app: {},
    auth: {},
    getRedirectResult: async (a, b) => { return null },
  };
});

jest.mock('./src/services/datasource.ts', () => {
  return {
    fetchUser: jest.fn(),
    listenLinksFromUser: jest.fn(),
    insertLink: jest.fn(),
    migrateLocalData: jest.fn(),
    unsaveLink: jest.fn(),
  };
});

jest.mock('./src/services/auth.ts', () => {
  return {
    signIn: jest.fn(),
    upserUser: jest.fn(),
    getSignInResult: jest.fn(),
  };
});

jest.mock("./src/hooks/useAuth", () => {
  return ({
    useAuth: jest.fn(() => ({
      isAuthenticated: false,
      authUser: null,
    })),
  })
});

