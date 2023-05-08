import * as apiRoutes from '../apiRoutes'

describe('apiRoutes', () => {
  it('matches snapshot', () => {
    expect(apiRoutes).toMatchSnapshot()
  })

  it('getCreatedLists should return correct result', () => {
    expect(apiRoutes.getCreatedLists(123)).toEqual('/account/123/lists')
  })

  it('getListDetails should return correct result', () => {
    expect(apiRoutes.getListDetails('123')).toEqual('/list/123')
  })

  it('addToList should return correct result', () => {
    expect(apiRoutes.addToList('123')).toEqual('/list/123/add_item')
  })

  it('removeFromList should return correct result', () => {
    expect(apiRoutes.removeFromList('123')).toEqual('/list/123/remove_item')
  })

  it('deleteList should return correct result', () => {
    expect(apiRoutes.deleteList('123')).toEqual('/list/123')
  })

  it('getWatchlist should return correct result', () => {
    expect(apiRoutes.getWatchlist(123)).toEqual('/account/123/watchlist/movies')
  })

  it('getFavorite should return correct result', () => {
    expect(apiRoutes.getFavorite(123)).toEqual('/account/123/favorite/movies')
  })

  it('getMovieDetails should return correct result', () => {
    expect(apiRoutes.getMovieDetails('123')).toEqual('/movie/123')
  })

  it('getMovieCredits should return correct result', () => {
    expect(apiRoutes.getMovieCredits('123')).toEqual('/movie/123/credits')
  })

  it('getMovieImages should return correct result', () => {
    expect(apiRoutes.getMovieImages('123')).toEqual('/movie/123/images')
  })

  it('getMovieAccountStates should return correct result', () => {
    expect(apiRoutes.getMovieAccountStates('123')).toEqual('/movie/123/account_states')
  })

  it('addToFovorite should return correct result', () => {
    expect(apiRoutes.addToFovorite(123)).toEqual('/account/123/favorite')
  })

  it('addToWatchlist should return correct result', () => {
    expect(apiRoutes.addToWatchlist(123)).toEqual('/account/123/watchlist')
  })
})
