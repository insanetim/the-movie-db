import { createLogic } from 'redux-logic'

import * as endpoints from 'src/constants/endpoints'
import { fetchLists } from 'src/state/lists/actions'
import * as types from '../types'
import { setMovie, setMovieInFavorites, setMovieInWatchlist } from '../actions'

const fetchMovie = createLogic({
  type: types.FETCH_MOVIE,
  latest: true,
  async process({ httpClient, getState, action: { payload: movieId, cb } }, dispatch, done) {
    const {
      session: { sessionId }
    } = getState()
    const { data } = await httpClient.get(endpoints.getMovieDetails(movieId))
    const { data: credits } = await httpClient.get(endpoints.getMovieCredits(movieId))
    const { data: images } = await httpClient.get(endpoints.getMovieImages(movieId))
    const { data: accountStates } = await httpClient.get(endpoints.getMovieAccountStates(movieId), {
      params: { session_id: sessionId }
    })
    data.credits = credits
    data.images = images.backdrops.slice(0, 6)
    dispatch(setMovie(data))
    dispatch(setMovieInFavorites(accountStates.favorite))
    dispatch(setMovieInWatchlist(accountStates.watchlist))
    dispatch(fetchLists())
    if (cb) cb()
    done()
  }
})

export default fetchMovie
