import { configureStore } from '@reduxjs/toolkit'

jest.mock('@reduxjs/toolkit', () => ({
  configureStore: jest.fn()
}))

it('creates store', () => {
  jest.requireActual('../index')

  expect(configureStore).toHaveBeenCalledWith(
    expect.objectContaining({
      reducer: expect.any(Function),
      middleware: expect.any(Array),
      devTools: expect.any(Boolean)
    })
  )
})
