import { createLogic } from 'redux-logic'

import * as endpoints from 'src/constants/endpoints'
import { showNotification } from 'src/state/app/actions'
import { fetchFavorites } from 'src/state/favorites/actions'
import { accountSelector, sessionIdSelector } from 'src/state/session/selectors'
import { fetchMovieStates } from '../actions'
import * as types from '../types'

const changeMovieInFavorites = createLogic({
  type: types.CHANGE_MOVIE_IN_FAVORITES,
  latest: true,
  async process(
    {
      httpClient,
      getState,
      action: {
        payload: { movieId, inFavorites }
      }
    },
    dispatch,
    done
  ) {
    const sessionId = sessionIdSelector(getState())
    const { id: accountId } = accountSelector(getState())
    try {
      const { data: movie } = await httpClient.get(endpoints.getMovieDetails(movieId))
      await httpClient.post(
        endpoints.addToFovorite(accountId),
        { media_type: 'movie', media_id: movieId, favorite: inFavorites },
        { params: { session_id: sessionId } }
      )
      const message = inFavorites ? `${movie.title} added to Favorites` : `${movie.title} removed from Favorites`
      dispatch(showNotification({ type: 'success', message }))
      dispatch(fetchMovieStates(movieId))
      dispatch(fetchFavorites(1))
    } catch (error) {
      dispatch(showNotification({ type: 'error', message: error.message }))
    }
    done()
  }
})

export default changeMovieInFavorites
