import { createLogic } from 'redux-logic'
import { or, path } from 'ramda'

import * as endpoints from 'src/constants/endpoints'
import { sessionIdSelector } from 'src/state/session/selectors'
import { showNotification } from 'src/state/app/actions'
import * as types from '../types'
import { fetchList } from '../actions'

const removeFromList = createLogic({
  type: types.REMOVE_FROM_LIST,
  latest: true,

  async process({ httpClient, getState, action }, dispatch, done) {
    const sessionId = sessionIdSelector(getState())
    const listId = path(['payload', 'listId'], action)
    const movieId = path(['payload', 'movieId'], action)

    try {
      const { data: movie } = await httpClient.get(endpoints.getMovieDetails(movieId))
      const { data: list } = await httpClient.get(endpoints.getListDetails(listId))
      await httpClient.post(
        endpoints.removeFromList(listId),
        { media_id: movieId },
        { params: { session_id: sessionId } }
      )
      const messageText = `${movie.title} removed from ${list.name}`
      dispatch(showNotification({ messageText }))
      dispatch(fetchList(listId))
    } catch (error) {
      const errorMessage = or(path(['response', 'data', 'status_message'], error), error.message)
      dispatch(showNotification({ messageType: 'error', messageText: errorMessage }))
    }

    done()
  }
})

export default removeFromList
