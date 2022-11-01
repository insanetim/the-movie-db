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
