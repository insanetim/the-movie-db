import { createLogic } from 'redux-logic'
import { notification as AntdNotification } from 'antd'
import Cookies from 'js-cookie'
import { merge } from 'lodash'

import * as endpoints from 'src/constants/endpoints'
import * as types from './types'
import * as actions from './actions'

const notification = createLogic({
  type: types.SHOW_NOTIFICATION,
  latest: true,
  process({
    action: {
      payload: { type, message }
    }
  }) {
    AntdNotification[type]({ message, duration: 2.5 })
  }
})

const showModal = createLogic({
  type: types.SHOW_MODAL,
  latest: true,
  transform({ action }, next) {
    const newAction = merge(action, {
      payload: {
        modalProps: {
          open: true
        }
      }
    })
    next(newAction)
  }
})

const login = createLogic({
  type: types.LOG_IN,
  cancelType: types.LOG_IN_CANCEL,
  latest: true,
  async process({ httpClient, action: { payload, cb } }, dispatch, done) {
    dispatch(actions.loadingOn())
    const { data: requestTokenData } = await httpClient.get(endpoints.createRequestToken)
    const { data: sessionToken } = await httpClient
      .post(endpoints.createSessionWithLogin, {
        request_token: requestTokenData.request_token,
        ...payload
      })
      .catch(error => {
        dispatch(actions.showNotification({ type: 'error', message: error.response.data.status_message }))
        dispatch(actions.loadingOff())
        dispatch({ type: types.LOG_IN_CANCEL })
        done()
      })
    const { data } = await httpClient.post(endpoints.createSession, {
      request_token: sessionToken.request_token
    })
    Cookies.set('session_id', data.session_id)
    dispatch(actions.loadingOff())
    cb()
    done()
  }
})

const logout = createLogic({
  type: types.LOG_OUT,
  latest: true,
  async process({ httpClient, getState, action: { cb } }, dispatch, done) {
    const { sessionId } = getState()
    const { data } = await httpClient.delete(endpoints.deleteSession, {
      data: { session_id: sessionId }
    })
    if (data.success) {
      Cookies.remove('session_id')
      dispatch(actions.deleteSession())
      cb()
    }
    done()
  }
})

const requestAccount = createLogic({
  type: types.REQUEST_ACCOUNT,
  latest: true,
  async process({ httpClient, getState }, dispatch, done) {
    const { sessionId } = getState()
    const { data } = await httpClient.get(endpoints.getAccountDetails, {
      params: {
        session_id: sessionId
      }
    })
    dispatch(actions.setAccount(data))
    done()
  }
})

const requestTrending = createLogic({
  type: types.REQUEST_TRENDING,
  latest: true,
  async process({ httpClient, action: { payload: page = 1 } }, dispatch, done) {
    const { data } = await httpClient.get(endpoints.getTrending, {
      params: {
        page
      }
    })
    dispatch(actions.setTrending(data))
    done()
  }
})

const requestSearch = createLogic({
  type: types.REQUEST_SEARCH,
  latest: true,
  async process(
    {
      httpClient,
      action: {
        payload: { query, page = 1 }
      }
    },
    dispatch,
    done
  ) {
    const { data } = await httpClient.get(endpoints.searchMovies, {
      params: { query, page }
    })
    dispatch(actions.setSearch(data))
    done()
  }
})

const requestLists = createLogic({
  type: types.REQUEST_LISTS,
  latest: true,
  async process({ httpClient, getState, action: { payload: page = 1, cb } }, dispatch, done) {
    const {
      sessionId,
      account: { id }
    } = getState()
    const { data } = await httpClient.get(endpoints.getCreatedLists(id), {
      params: { session_id: sessionId, page }
    })
    dispatch(actions.setLists(data))
    if (cb) cb()
    done()
  }
})

const requestList = createLogic({
  type: types.REQUEST_LIST,
  latest: true,
  async process({ httpClient, action: { payload: listId, cb } }, dispatch, done) {
    const { data } = await httpClient.get(endpoints.getListDetails(listId))
    dispatch(actions.setList(data))
    if (cb) cb()
    done()
  }
})

const createList = createLogic({
  type: types.CREATE_LIST,
  latest: true,
  async process({ httpClient, getState, action: { payload, cb } }, dispatch, done) {
    const { sessionId } = getState()
    await httpClient
      .post(
        endpoints.createList,
        { ...payload },
        {
          params: {
            session_id: sessionId
          }
        }
      )
      .then(({ data }) => {
        if (cb) cb(data.list_id)
      })
      .finally(() => {
        dispatch(actions.requestLists())
      })
    done()
  }
})

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
    const { sessionId } = getState()
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
        dispatch(actions.showNotification({ type: 'success', message }))
      })
      .catch(() => {
        const message = `${movie.title} is already in ${list.name}`
        dispatch(actions.showNotification({ type: 'error', message }))
      })
    done()
  }
})

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
    const { sessionId } = getState()
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
        dispatch(actions.showNotification({ type: 'success', message }))
        dispatch(actions.requestList(listId))
      })
    done()
  }
})

const deleteList = createLogic({
  type: types.DELETE_LIST,
  latest: true,
  async process({ httpClient, getState, action: { payload: listId, cb } }, dispatch, done) {
    const { sessionId } = getState()
    await httpClient
      .delete(endpoints.deleteList(listId), {
        params: { session_id: sessionId }
      })
      .finally(() => {
        dispatch(actions.requestLists(1, cb))
        done()
      })
  }
})

const requestWatchlist = createLogic({
  type: types.REQUEST_WATCHLIST,
  latest: true,
  async process({ httpClient, getState, action: { payload: page = 1 } }, dispatch, done) {
    const {
      sessionId,
      account: { id }
    } = getState()
    const { data } = await httpClient.get(endpoints.getWatchlist(id), {
      params: { session_id: sessionId, page }
    })
    dispatch(actions.setWatchlist(data))
    done()
  }
})

const requestFavorites = createLogic({
  type: types.REQUEST_FAVORITES,
  latest: true,
  async process({ httpClient, getState, action: { payload: page = 1 } }, dispatch, done) {
    const {
      sessionId,
      account: { id }
    } = getState()
    const { data } = await httpClient.get(endpoints.getFavorites(id), {
      params: { session_id: sessionId, page }
    })
    dispatch(actions.setFavorites(data))
    done()
  }
})

const requestMovie = createLogic({
  type: types.REQUEST_MOVIE,
  latest: true,
  async process({ httpClient, getState, action: { payload: movieId, cb } }, dispatch, done) {
    const { sessionId } = getState()
    const { data } = await httpClient.get(endpoints.getMovieDetails(movieId))
    const { data: credits } = await httpClient.get(endpoints.getMovieCredits(movieId))
    const { data: images } = await httpClient.get(endpoints.getMovieImages(movieId))
    const { data: accountStates } = await httpClient.get(endpoints.getMovieAccountStates(movieId), {
      params: { session_id: sessionId }
    })
    data.credits = credits
    data.images = images.backdrops.slice(0, 6)
    data.accountStates = accountStates
    dispatch(actions.setMovie(data))
    dispatch(actions.requestLists())
    if (cb) cb()
    done()
  }
})

const changeMovieInFavorite = createLogic({
  type: types.CHANGE_MOVIE_IN_FAVORITE,
  latest: true,
  async process(
    {
      httpClient,
      getState,
      action: {
        payload: { movieId, inFavorite }
      }
    },
    dispatch,
    done
  ) {
    const {
      sessionId,
      account: { id: accountId }
    } = getState()
    const { data: movie } = await httpClient.get(endpoints.getMovieDetails(movieId))
    await httpClient
      .post(
        endpoints.addToFovorite(accountId),
        { media_type: 'movie', media_id: movieId, favorite: inFavorite },
        { params: { session_id: sessionId } }
      )
      .then(() => {
        const message = inFavorite ? `${movie.title} added to Favorites` : `${movie.title} removed from Favorites`
        dispatch(actions.showNotification({ type: 'success', message }))
        dispatch(actions.setMovieInFavorite({ inFavorite }))
        dispatch(actions.requestFavorites())
      })
    done()
  }
})

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
      sessionId,
      account: { id: accountId }
    } = getState()
    const { data: movie } = await httpClient.get(endpoints.getMovieDetails(movieId))
    await httpClient
      .post(
        endpoints.addToWatchlist(accountId),
        { media_type: 'movie', media_id: movieId, watchlist: inWatchlist },
        { params: { session_id: sessionId } }
      )
      .then(() => {
        const message = inWatchlist ? `${movie.title} added to Watchlist` : `${movie.title} removed from Watchlist`
        dispatch(actions.showNotification({ type: 'success', message }))
        dispatch(actions.setMovieInWatchlist({ inWatchlist }))
        dispatch(actions.requestWatchlist())
      })
    done()
  }
})

export default [
  notification,
  showModal,
  login,
  logout,
  requestAccount,
  requestTrending,
  requestSearch,
  requestLists,
  requestList,
  createList,
  addToList,
  removeFromList,
  deleteList,
  requestWatchlist,
  requestFavorites,
  requestMovie,
  changeMovieInFavorite,
  changeMovieInWatchlist
]
