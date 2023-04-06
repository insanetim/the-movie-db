module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  collectCoverageFrom: ['<rootDir>/src/**/*.{js,jsx}'],
  coveragePathIgnorePatterns: ['<rootDir>/src/index.js'],
  coverageThreshold: {
    global: {
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100
    }
  },
  clearMocks: true,
  modulePaths: ['<rootDir>/'],
  moduleFileExtensions: ['js', 'jsx'],
  moduleDirectories: ['node_modules'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/src/__mocks__/fileMock.js',
    '\\.(s?css)$': 'identity-obj-proxy'
  }
}
