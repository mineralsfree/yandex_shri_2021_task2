module.exports = {
  "roots": [
    "<rootDir>/src"
  ],
  "testMatch": [
    "**/__tests__/**/*.+(ts)",
    "**/?(*.)+(spec|test).+(ts)"
  ],
  "transform": {
    "^.+\\.(ts)$": "ts-jest"
  },
  coverageThreshold: {
    global: {
      branches: 60,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  coverageReporters: ['json', 'lcov', 'text', 'clover']
}