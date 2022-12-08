import { createLogic } from 'redux-logic'
import { always, equals, ifElse, or, path, T } from 'ramda'

import * as endpoints from 'src/constants/endpoints'
import { showNotification } from 'src/state/app/actions'
import { fetchFavorites } from 'src/state/favorites/actions'
import { accountSelector, sessionIdSelector } from 'src/state/session/selectors'
import { fetchMovieStates } from '../actions'
import * as types from '../types'

const changeMovieInFavorites = createLogic({
  type: types.CHANGE_MOVIE_IN_FAVORITES,
  latest: true,

  async process({ httpClient, getState, action }, dispatch, done) {
    const sessionId = sessionIdSelector(getState())
    const { id: accountId } = accountSelector(getState())
    const movieId = path(['payload', 'movieId'], action)
    const inFavorites = path(['payload', 'inFavorites'], action)

    try {
      const { data: movie } = await httpClient.get(endpoints.getMovieDetails(movieId))
      await httpClient.post(
        endpoints.addToFovorite(accountId),
        { media_type: 'movie', media_id: movieId, favorite: inFavorites },
        { params: { session_id: sessionId } }
      )
      dispatch(fetchMovieStates(movieId))
      dispatch(fetchFavorites())
      const messageText = ifElse(
        equals(T()),
        always(`${movie.title} added to Favorites`),
        always(`${movie.title} removed from Favorites`)
      )(inFavorites)
      dispatch(showNotification({ messageText }))
    } catch (error) {
      const errorMessage = or(path(['response', 'data', 'status_message'], error), error.message)
      dispatch(showNotification({ messageType: 'error', messageText: errorMessage }))
    }

    done()
  }
})

export default changeMovieInFavorites
