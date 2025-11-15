import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
})

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  collectCoverageFrom: [
    // The patterns below tell Jest which files should be included or excluded from coverage. 
    // The ** pattern (globstar) means "any number of subfolders".
    // For example, "components/**/*.{js,jsx,ts,tsx}" matches any .js, .jsx, .ts, or .tsx file 
    // inside the components directory, no matter how deeply nested.
    // "lib/**/*.{js,ts}" matches .js or .ts files anywhere within lib/ and its subfolders.
    // Patterns starting with ! are exclusions:
    // "!**/*.d.ts" excludes all TypeScript declaration files from any folder.
    // "!**/node_modules/**" excludes anything in any node_modules directory.
    // "!**/*.test.{js,jsx,ts,tsx}" excludes all test files from any folder.
    "components/**/*.{js,jsx,ts,tsx}",
    "lib/**/*.{js,ts}",
    "!**/*.d.ts",
    "!**/node_modules/**",
    "!**/*.test.{js,jsx,ts,tsx}",
  ],
  moduleNameMapper: {
    // This line tells Jest how to resolve import paths that start with "@/":
    // For example, if a file imports something with `import abc from "@/lib/foo"`,
    // this pattern will match any import starting with "@/" and replace it with the actual path
    // relative to the root directory of your project.
    // "^@/(.*)$": "<rootDir>/$1",
    "^@/(.*)$": "<rootDir>/$1"
  },

  // setup file that will run afer env is being 
  // loaded and then before actual tests kicks off
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};


export default createJestConfig(config)