import { createLogic } from 'redux-logic'

import * as endpoints from 'src/constants/endpoints'
import { showNotification } from 'src/state/app/actions'
import { fetchWatchlist } from 'src/state/watchlist/actions'
import * as types from '../types'
import { setMovieInWatchlist } from '../actions'

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
    const {
      session: {
        sessionId,
        account: { id }
      }
    } = getState()
    const { data: movie } = await httpClient.get(endpoints.getMovieDetails(movieId))
    await httpClient
      .post(
        endpoints.addToWatchlist(id),
        { media_type: 'movie', media_id: movieId, watchlist: inWatchlist },
        { params: { session_id: sessionId } }
      )
      .then(() => {
        const message = inWatchlist ? `${movie.title} added to Watchlist` : `${movie.title} removed from Watchlist`
        dispatch(showNotification({ type: 'success', message }))
        dispatch(setMovieInWatchlist(inWatchlist))
        dispatch(fetchWatchlist())
      })
    done()
  }
})

export default changeMovieInWatchlist
