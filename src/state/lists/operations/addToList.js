import { createLogic } from 'redux-logic'

import * as endpoints from 'src/constants/endpoints'
import { showNotification } from 'src/state/app/actions'
import * as types from '../types'

const addToList = createLogic({
  type: types.ADD_TO_LIST,
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
        endpoints.addToList(listId),
        { media_id: movieId },
        {
          params: {
            session_id: sessionId
          }
        }
      )
      .then(() => {
        const message = `${movie.title} added to ${list.name}`
        dispatch(showNotification({ type: 'success', message }))
      })
      .catch(() => {
        const message = `${movie.title} is already in ${list.name}`
        dispatch(showNotification({ type: 'error', message }))
      })
    done()
  }
})

export default addToList
