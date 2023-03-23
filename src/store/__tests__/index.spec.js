import store from '../index'

describe('store', () => {
  it('passes tests', () => {
    expect(store).toEqual(
      expect.objectContaining({
        '@@observable': expect.any(Function),
        dispatch: expect.any(Function),
        getState: expect.any(Function),
        replaceReducer: expect.any(Function),
        subscribe: expect.any(Function)
      })
    )
  })
})
