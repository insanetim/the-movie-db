import * as selectors from '../selectors'

it('accountSelector', () => {
  const account = 'test/account'
  const state = {
    session: {
      account
    }
  }

  expect(selectors.accountSelector(state)).toEqual(account)
})

it('loadingSelector', () => {
  const loading = 'test/loading'
  const state = { app: { loading } }

  expect(selectors.loadingSelector(state)).toEqual(loading)
})
