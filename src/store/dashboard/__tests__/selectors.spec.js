import * as selectors from '../selectors'

describe('dashboard selectors', () => {
  it('trendingMoviesSelector', () => {
    const movies = 'test/movies'
    const state = { dashboard: { trending: { movies } } }

    expect(selectors.trendingMoviesSelector(state)).toEqual(movies)
  })

  it('trendingPageSelector', () => {
    const page = 'test/page'
    const state = { dashboard: { trending: { page } } }

    expect(selectors.trendingPageSelector(state)).toEqual(page)
  })

  it('trendingLoadingSelector', () => {
    const loading = 'test/loading'
    const state = { dashboard: { trending: { loading } } }

    expect(selectors.trendingLoadingSelector(state)).toEqual(loading)
  })

  it('trendingErrorSelector', () => {
    const error = 'test/error'
    const state = { dashboard: { trending: { error } } }

    expect(selectors.trendingErrorSelector(state)).toEqual(error)
  })

  it('searchMoviesSelector', () => {
    const movies = 'test/movies'
    const state = { dashboard: { search: { movies } } }

    expect(selectors.searchMoviesSelector(state)).toEqual(movies)
  })

  it('searchPageSelector', () => {
    const page = 'test/page'
    const state = { dashboard: { search: { page } } }

    expect(selectors.searchPageSelector(state)).toEqual(page)
  })

  it('searchLoadingSelector', () => {
    const loading = 'test/loading'
    const state = { dashboard: { search: { loading } } }

    expect(selectors.searchLoadingSelector(state)).toEqual(loading)
  })

  it('searchErrorSelector', () => {
    const error = 'test/error'
    const state = { dashboard: { search: { error } } }

    expect(selectors.searchErrorSelector(state)).toEqual(error)
  })
})
