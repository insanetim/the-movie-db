import setupStore from '../index'

it('creates store', () => {
  const store = setupStore()

  expect(store).toEqual(
    expect.objectContaining({
      dispatch: expect.any(Function),
      subscribe: expect.any(Function),
      getState: expect.any(Function),
      replaceReducer: expect.any(Function)
    })
  )
})
