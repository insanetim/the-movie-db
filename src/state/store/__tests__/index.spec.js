import { configureStore } from '@reduxjs/toolkit'

jest.mock('@reduxjs/toolkit', () => ({
  configureStore: jest.fn()
}))

it('creates store', () => {
  jest.requireActual('../index')

  expect(configureStore).toHaveBeenCalled()
})
