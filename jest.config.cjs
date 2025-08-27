module.exports = {
  preset: 'ts-jest',  
  testEnvironment: 'jsdom',  
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],  
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',  
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'  // Simplified - let ts-jest use default tsconfig
  },
  globals: {
    'ts-jest': {
      tsconfig: {
        jsx: 'react-jsx',
        esModuleInterop: true,
        allowSyntheticDefaultImports: true,
        strict: true,
        types: ["jest", "@testing-library/jest-dom", "node"]
      }
    }
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
  ],
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{ts,tsx}',
    '<rootDir>/src/**/*.{test,spec}.{ts,tsx}',
  ],
};