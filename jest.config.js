module.exports = {
  clearMocks: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/src/**/*index.{ts,tsx}',
    '!<rootDir>/src/**/*types.{ts,tsx}',
    '!<rootDir>/src/**/*{a,A}piSlice.{ts,tsx}',
    '!<rootDir>/src/interfaces/**/*.{ts,tsx}',
    '!<rootDir>/src/App.tsx',
  ],
  coveragePathIgnorePatterns: ['src/index.tsx', 'src/global.d.ts'],
  coverageThreshold: {
    global: {
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100,
    },
  },
  moduleDirectories: ['node_modules'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/src/__mocks__/fileMock.ts',
    '\\.(s?css)$': 'identity-obj-proxy',
  },
  modulePaths: ['<rootDir>/'],
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
  testEnvironment: 'jsdom',
}
