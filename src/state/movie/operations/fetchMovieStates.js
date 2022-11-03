import { createLogic } from 'redux-logic'

import * as endpoints from 'src/constants/endpoints'
import { showNotification } from 'src/state/app/actions'
import { sessionIdSelector } from 'src/state/session/selectors'
import * as types from '../types'
import { setMovieStates } from '../actions'

const fetchMovieStates = createLogic({
  type: types.FETCH_MOVIE_STATES,
  latest: true,
  async process({ httpClient, getState, action: { payload: movieId } }, dispatch, done) {
    const sessionId = sessionIdSelector(getState())
    try {
      const { data } = await httpClient.get(endpoints.getMovieAccountStates(movieId), {
        params: { session_id: sessionId }
      })
      dispatch(setMovieStates(data))
      done()
    } catch (error) {
      dispatch(showNotification({ type: 'error', message: error.message }))
    }
  }
})

export default fetchMovieStates
