import { createLogic } from 'redux-logic'
import { or, path } from 'ramda'

import * as endpoints from 'src/constants/endpoints'
import { showNotification } from 'src/state/app/actions'
import { sessionIdSelector } from 'src/state/session/selectors'
import * as types from '../types'
import { updateMovieStates } from '../actions'

const fetchMovieStates = createLogic({
  type: types.FETCH_MOVIE_STATES,
  latest: true,

  async process({ httpClient, getState, action }, dispatch, done) {
    const sessionId = sessionIdSelector(getState())
    const movieId = action.payload

    try {
      const { data } = await httpClient.get(endpoints.getMovieAccountStates(movieId), {
        params: { session_id: sessionId }
      })
      dispatch(updateMovieStates(data))
    } catch (error) {
      const errorMessage = or(path(['response', 'data', 'status_message'], error), error.message)
      dispatch(showNotification({ messageType: 'error', messageText: errorMessage }))
    }

    done()
  }
})

export default fetchMovieStates
