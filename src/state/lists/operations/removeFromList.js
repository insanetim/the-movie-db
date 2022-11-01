import { createLogic } from 'redux-logic'

import * as endpoints from 'src/constants/endpoints'
import { showNotification } from 'src/state/app/actions'
import * as types from '../types'
import { fetchList } from '../actions'

const removeFromList = createLogic({
  type: types.REMOVE_FROM_LIST,
  latest: true,
  async process(
    {
      httpClient,
      getState,
      action: {
        payload: { listId, movieId }
      }
    },
    dispatch,
    done
  ) {
    const {
      session: { sessionId }
    } = getState()
    const { data: movie } = await httpClient.get(endpoints.getMovieDetails(movieId))
    const { data: list } = await httpClient.get(endpoints.getListDetails(listId))
    await httpClient
      .post(
        endpoints.removeFromList(listId),
        { media_id: movieId },
        {
          params: {
            session_id: sessionId
          }
        }
      )
      .then(() => {
        const message = `${movie.title} removed from ${list.name}`
        dispatch(showNotification({ type: 'success', message }))
        dispatch(fetchList(listId))
      })
    done()
  }
})

export default removeFromList
