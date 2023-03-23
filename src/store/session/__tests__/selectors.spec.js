import * as selectors from '../selectors'

describe('session selectors', () => {
  it('sessionIdSelector', () => {
    const sessionId = 'test/sessionId'
    const state = { session: { sessionId } }

    expect(selectors.sessionIdSelector(state)).toEqual(sessionId)
  })

  it('accountSelector', () => {
    const account = 'test/account'
    const state = { session: { account } }

    expect(selectors.accountSelector(state)).toEqual(account)
  })

  it('loadingSelector', () => {
    const loading = 'test/loading'
    const state = { session: { loading } }

    expect(selectors.loadingSelector(state)).toEqual(loading)
  })
})
