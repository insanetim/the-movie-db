import { createLogic } from 'redux-logic'
import { always, equals, ifElse, or, path, T } from 'ramda'

import * as endpoints from 'src/constants/endpoints'
import { showNotification } from 'src/store/app/actions'
import { accountSelector, sessionIdSelector } from 'src/store/session/selectors'
import { fetchWatchlist } from 'src/store/watchlist/actions'
import { fetchMovieStates } from '../actions'
import * as types from '../types'

const changeMovieInWatchlist = createLogic({
  type: types.CHANGE_MOVIE_IN_WATCHLIST,
  latest: true,

  async process({ httpClient, getState, action }, dispatch, done) {
    const sessionId = sessionIdSelector(getState())
    const { id: accountId } = accountSelector(getState())
    const { movieId, inWatchlist } = action.payload

    try {
      const { data: movie } = await httpClient.get(endpoints.getMovieDetails(movieId))
      await httpClient.post(
        endpoints.addToWatchlist(accountId),
        { media_type: 'movie', media_id: movieId, watchlist: inWatchlist },
        { params: { session_id: sessionId } }
      )
      dispatch(fetchMovieStates(movieId))
      dispatch(fetchWatchlist())
      const messageText = ifElse(
        equals(T()),
        always(`${movie.title} added to Watchlist`),
        always(`${movie.title} removed from Watchlist`)
      )(inWatchlist)
      dispatch(showNotification({ messageText }))
    } catch (error) {
      const errorMessage = or(path(['response', 'data', 'status_message'], error), error.message)
      dispatch(showNotification({ messageType: 'error', messageText: errorMessage }))
    }

    done()
  }
})

export default changeMovieInWatchlist
