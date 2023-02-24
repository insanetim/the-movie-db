import * as selectors from '../selectors'

it('trendingSelector', () => {
  const trending = 'test/trending'
  const state = { dashboard: { trending } }

  expect(selectors.trendingSelector(state)).toEqual(trending)
})

it('searchSelector', () => {
  const search = 'test/search'
  const state = { dashboard: { search } }

  expect(selectors.searchSelector(state)).toEqual(search)
})
