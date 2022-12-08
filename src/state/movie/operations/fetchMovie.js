import { createLogic } from 'redux-logic'
import { or, path, pathOr, take } from 'ramda'

import * as endpoints from 'src/constants/endpoints'
import { showNotification } from 'src/state/app/actions'
import { fetchLists } from 'src/state/lists/actions'
import { sessionIdSelector } from 'src/state/session/selectors'
import { setMovie } from '../actions'
import * as types from '../types'

const fetchMovie = createLogic({
  type: types.FETCH_MOVIE,
  latest: true,

  async process({ httpClient, getState, action }, dispatch, done) {
    const sessionId = sessionIdSelector(getState())
    const movieId = path(['payload'], action)
    const callback = pathOr(null, ['callback'], action)

    try {
      const { data } = await httpClient.get(endpoints.getMovieDetails(movieId))
      const { data: images } = await httpClient.get(endpoints.getMovieImages(movieId))
      const { data: accountStates } = await httpClient.get(endpoints.getMovieAccountStates(movieId), {
        params: { session_id: sessionId }
      })
      const { data: credits } = await httpClient.get(endpoints.getMovieCredits(movieId))
      data.images = take(6, images.backdrops)
      data.accountStates = accountStates
      data.credits = credits
      dispatch(setMovie(data))
      dispatch(fetchLists())
      if (typeof callback === 'function') callback()
    } catch (error) {
      const errorMessage = or(path(['response', 'data', 'status_message'], error), error.message)
      dispatch(showNotification({ messageType: 'error', messageText: errorMessage }))
    }

    done()
  }
})

export default fetchMovie
