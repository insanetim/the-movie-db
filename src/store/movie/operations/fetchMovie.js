import { createLogic } from 'redux-logic'
import { take } from 'ramda'

import * as endpoints from 'src/constants/endpoints'
import { fetchLists } from 'src/store/lists/actions'
import { sessionIdSelector } from 'src/store/session/selectors'
import { fetchMovieRequest, fetchMovieSuccess, fetchMovieFailure } from '../actions'
import * as types from '../types'

const fetchMovie = createLogic({
  type: types.FETCH_MOVIE,
  latest: true,

  async process({ httpClient, getState, action }, dispatch, done) {
    const sessionId = sessionIdSelector(getState())
    const movieId = action.payload

    dispatch(fetchMovieRequest())

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
      dispatch(fetchLists())
      dispatch(fetchMovieSuccess(data))
    } catch (error) {
      dispatch(fetchMovieFailure(error))
    }

    done()
  }
})

export default fetchMovie
