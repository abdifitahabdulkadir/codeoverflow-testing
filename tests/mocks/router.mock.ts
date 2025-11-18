const mockRouters = {
  push: jest.fn(),
  replace: jest.fn(),
  back: jest.fn(),
  forward: jest.fn(),
  prefetch: jest.fn(),
};

const mockUseRouter = jest.fn(() => {
  return mockRouters;
});

export { mockRouters, mockUseRouter };
