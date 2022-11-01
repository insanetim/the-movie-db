import * as selectors from '../selectors'

it('trendingSelector', () => {
  const trending = 'test/trending'
  const state = { dashboard: { trending } }

  expect(selectors.trendingSelector(state)).toEqual(trending)
})

it('searchSelector', () => {
  const search = 'test/search'
  const state = { dashboard: { search: { search } } }

  expect(selectors.searchSelector(state)).toEqual(search)
})

it('searchQuerySelector', () => {
  const searchQuery = 'test/searchQuery'
  const state = { dashboard: { search: { searchQuery } } }

  expect(selectors.searchQuerySelector(state)).toEqual(searchQuery)
})
