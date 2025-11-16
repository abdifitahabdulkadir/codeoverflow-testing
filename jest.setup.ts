import "@testing-library/jest-dom";

/**
 * we are mocking built-in module of nextjs by mokcing the tree of
 * that object. next/navigatiion exprts bunch of objects as functions
 * then one of them is useRouter
 */
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
  })),
}));
