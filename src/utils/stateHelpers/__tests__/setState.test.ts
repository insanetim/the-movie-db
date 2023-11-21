import setState from '../setState'

describe('setState', () => {
  it('handles pending', () => {
    const state = { data: null, error: null, loading: true }
    setState.pending(state)

    expect(state).toEqual({ data: null, error: null, loading: true })
  })

  it('handles fulfilled', () => {
    const state = { data: null, error: null, loading: true }
    const action = { payload: 'test/data', type: 'unknown' }
    setState.fulfilled(state, action)

    expect(state).toEqual({ data: 'test/data', error: null, loading: false })
  })

  it('handles rejected', () => {
    const state = { data: null, error: null, loading: true }
    const action = { payload: 'test/error', type: 'unknown' }
    setState.rejected(state, action)

    expect(state).toEqual({ data: null, error: 'test/error', loading: false })
  })
})
