import * as selectors from '../selectors'

it('movieSelector', () => {
  const movie = 'test/movie'
  const state = {
    movie: {
      movie
    }
  }

  expect(selectors.movieSelector(state)).toEqual(movie)
})

it('movieInFavoritesSelector', () => {
  const movieInFavorites = 'test/movieInFavorites'
  const state = {
    movie: {
      movieInFavorites
    }
  }

  expect(selectors.movieInFavoritesSelector(state)).toEqual(movieInFavorites)
})

it('movieInWatchlistSelector', () => {
  const movieInWatchlist = 'test/movieInWatchlist'
  const state = {
    movie: {
      movieInWatchlist
    }
  }

  expect(selectors.movieInWatchlistSelector(state)).toEqual(movieInWatchlist)
})
