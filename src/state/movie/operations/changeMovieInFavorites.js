import { createLogic } from 'redux-logic'

import * as endpoints from 'src/constants/endpoints'
import { showNotification } from 'src/state/app/actions'
import { requestFavorites } from 'src/state/favorites/actions'
import { setMovieInFavorites } from '../actions'
import * as types from '../types'

const changeMovieInFavorites = createLogic({
  type: types.CHANGE_MOVIE_IN_FAVORITES,
  latest: true,
  async process(
    {
      httpClient,
      getState,
      action: {
        payload: { movieId, inFavorite }
      }
    },
    dispatch,
    done
  ) {
    const {
      session: {
        sessionId,
        account: { id }
      }
    } = getState()
    const { data: movie } = await httpClient.get(endpoints.getMovieDetails(movieId))
    await httpClient
      .post(
        endpoints.addToFovorite(id),
        { media_type: 'movie', media_id: movieId, favorite: inFavorite },
        { params: { session_id: sessionId } }
      )
      .then(() => {
        const message = inFavorite ? `${movie.title} added to Favorites` : `${movie.title} removed from Favorites`
        dispatch(showNotification({ type: 'success', message }))
        dispatch(setMovieInFavorites(inFavorite))
        dispatch(requestFavorites())
      })
    done()
  }
})

export default changeMovieInFavorites
