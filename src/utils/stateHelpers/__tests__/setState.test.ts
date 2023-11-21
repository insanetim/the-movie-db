import setState from '../setState'

describe('setState', () => {
  it('should handle pending', () => {
    const state = { data: null, error: null, loading: true }
    setState.pending(state)

    expect(state).toEqual({ data: null, error: null, loading: true })
  })

  it('should handle fulfilled', () => {
    const state = { data: null, error: null, loading: true }
    const action = { payload: 'test/data', type: 'fulfilled' }
    setState.fulfilled(state, action)

    expect(state).toEqual({ data: 'test/data', error: null, loading: false })
  })

  it('should handle rejected', () => {
    const state = { data: null, error: null, loading: true }
    const action = { payload: 'test/error', type: 'rejected' }
    setState.rejected(state, action)

    expect(state).toEqual({ data: null, error: 'test/error', loading: false })
  })
})
