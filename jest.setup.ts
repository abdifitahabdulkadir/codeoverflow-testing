import "@testing-library/jest-dom";
import { mockToast, mockUseToast } from "./tests/mocks";
import { mockUseRouter } from "./tests/mocks/router.mock";

/**
 * we are mocking built-in module of nextjs by mokcing the tree of
 * that object. next/navigatiion exprts bunch of objects as functions
 * then one of them is useRouter
 */
jest.mock("next/navigation", () => ({
  useRouter: mockUseRouter,
}));

jest.mock("@hooks/use-toast", () => ({
  useToast: mockUseToast,
  toast: mockToast,
}));
