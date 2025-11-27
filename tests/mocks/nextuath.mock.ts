const mockSession = {
  user: {
    id: "1234",
    name: "Abdifitah Abdulkadir",
    email: "seaph@gmail.com",
    image: "https://www.example.com/avator.png",
  },
  expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
};

const mockAuth = jest.fn();
const mockSignIn = jest.fn();
const mockSignOut = jest.fn();

const mockHandlers = {
  GET: jest.fn(),
  POST: jest.fn(),
};

const mockUseSession = jest.fn(() => ({
  data: mockSession,
  status: "authenticated",
  update: jest.fn(),
}));

const mockGetSesssion = jest.fn();
const mockGetServerSession = jest.fn();
const mockSignInReact = jest.fn();
const mockSignOutReact = jest.fn();

const mockGithub = jest.fn();
const mockGoogle = jest.fn();
const mockCredentials = jest.fn();

export {
  mockAuth,
  mockCredentials,
  mockGetServerSession,
  mockGetSesssion,
  mockGithub,
  mockGoogle,
  mockHandlers,
  mockSession,
  mockSignIn,
  mockSignInReact,
  mockSignOut,
  mockSignOutReact,
  mockUseSession,
};
