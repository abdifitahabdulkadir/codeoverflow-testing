export * from "./router.mock";
export * from "./toast.mock";

/**
 * this is the function clears all data of the test including it there is input
 * fielc being filled with data, all memories of data of component and soo n.
 */
export const resetAllMockes = () => {
  jest.clearAllMocks();
};
