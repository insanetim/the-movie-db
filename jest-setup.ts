import '@testing-library/jest-dom'
import { TextDecoder, TextEncoder } from 'node:util'

Object.defineProperty(window, 'matchMedia', {
  value: jest.fn().mockImplementation(query => ({
    addEventListener: jest.fn(),
    addListener: jest.fn(), // deprecated
    dispatchEvent: jest.fn(),
    matches: false,
    media: query,
    onchange: null,
    removeEventListener: jest.fn(),
    removeListener: jest.fn(), // deprecated
  })),
  writable: true,
})

Object.defineProperty(window, 'getComputedStyle', {
  value: jest.fn(() => ({
    getPropertyValue: () => '',
    overflow: 'hidden',
    overflowX: 'hidden',
    overflowY: 'hidden',
  })),
})

Object.assign(global, {
  TextDecoder,
  TextEncoder,
})

global.fetch = jest.fn()
