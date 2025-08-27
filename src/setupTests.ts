// src/setupTests.ts
import '@testing-library/jest-dom';

// Polyfill for TextEncoder/TextDecoder
import { TextEncoder, TextDecoder } from 'util';

Object.assign(global, { 
  TextEncoder, 
  TextDecoder,
});

// Optional: Add fetch polyfill if needed
global.fetch = jest.fn();

// Optional: Mock window.matchMedia if needed
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});