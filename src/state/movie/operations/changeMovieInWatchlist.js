import { createLogic } from 'redux-logic'

import * as endpoints from 'src/constants/endpoints'
import { showNotification } from 'src/state/app/actions'
import { fetchWatchlist } from 'src/state/watchlist/actions'
import { accountSelector, sessionIdSelector } from 'src/state/session/selectors'
import { fetchMovieStates } from '../actions'
import * as types from '../types'

const changeMovieInWatchlist = createLogic({
  type: types.CHANGE_MOVIE_IN_WATCHLIST,
  latest: true,
  async process(
    {
      httpClient,
      getState,
      action: {
        payload: { movieId, inWatchlist }
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
        endpoints.addToWatchlist(accountId),
        { media_type: 'movie', media_id: movieId, watchlist: inWatchlist },
        { params: { session_id: sessionId } }
      )
      const message = inWatchlist ? `${movie.title} added to Watchlist` : `${movie.title} removed from Watchlist`
      dispatch(showNotification({ type: 'success', message }))
      dispatch(fetchMovieStates(movieId))
      dispatch(fetchWatchlist(1))
    } catch (error) {
      dispatch(showNotification({ type: 'error', message: error.message }))
    }
    done()
  }
})

export default changeMovieInWatchlist
