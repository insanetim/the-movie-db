import * as endpoints from '../endpoints'

describe('endpoints', () => {
  it('constants matches snapshot', () => {
    expect(endpoints).toMatchSnapshot()
  })

  it('getCreatedLists should return correct result', () => {
    expect(endpoints.getCreatedLists(123)).toEqual('/account/123/lists')
  })

  it('getListDetails should return correct result', () => {
    expect(endpoints.getListDetails(123)).toEqual('/list/123')
  })

  it('addToList should return correct result', () => {
    expect(endpoints.addToList(123)).toEqual('/list/123/add_item')
  })

  it('removeFromList should return correct result', () => {
    expect(endpoints.removeFromList(123)).toEqual('/list/123/remove_item')
  })

  it('deleteList should return correct result', () => {
    expect(endpoints.deleteList(123)).toEqual('/list/123')
  })

  it('getWatchlist should return correct result', () => {
    expect(endpoints.getWatchlist(123)).toEqual('/account/123/watchlist/movies')
  })

  it('getFavorites should return correct result', () => {
    expect(endpoints.getFavorites(123)).toEqual('/account/123/favorite/movies')
  })

  it('getMovieDetails should return correct result', () => {
    expect(endpoints.getMovieDetails(123)).toEqual('/movie/123')
  })

  it('getMovieCredits should return correct result', () => {
    expect(endpoints.getMovieCredits(123)).toEqual('/movie/123/credits')
  })

  it('getMovieImages should return correct result', () => {
    expect(endpoints.getMovieImages(123)).toEqual('/movie/123/images')
  })

  it('getMovieAccountStates should return correct result', () => {
    expect(endpoints.getMovieAccountStates(123)).toEqual('/movie/123/account_states')
  })

  it('addToFovorite should return correct result', () => {
    expect(endpoints.addToFovorite(123)).toEqual('/account/123/favorite')
  })

  it('addToWatchlist should return correct result', () => {
    expect(endpoints.addToWatchlist(123)).toEqual('/account/123/watchlist')
  })
})
