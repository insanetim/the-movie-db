import { createLogic } from 'redux-logic'
import { notification as AntdNotification } from 'antd'
import * as Cookies from 'js-cookie'
import { merge } from 'lodash'

import * as routes from 'src/constants/routes'
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
    AntdNotification[type]({ message })
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
    const { data: requestTokenData } = await httpClient.get(routes.createRequestToken)
    const { data: sessionToken } = await httpClient
      .post(routes.createSessionWithLogin, {
        request_token: requestTokenData.request_token,
        ...payload
      })
      .catch(error => {
        dispatch(actions.showNotification({ type: 'error', message: error.response.data.status_message }))
        dispatch(actions.loadingOff())
        dispatch({ type: types.LOG_IN_CANCEL })
        done()
      })
    const { data } = await httpClient.post(routes.createSession, {
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
    const { data } = await httpClient.delete(routes.deleteSession, {
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
    const { data } = await httpClient.get(routes.getDetails, {
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
    const { data } = await httpClient.get(routes.getTrending, {
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
    dispatch(actions.setSearchQuery(query))
    const { data } = await httpClient.get(routes.searchMovies, {
      params: { query, page }
    })
    dispatch(actions.setSearchResult(data))
    done()
  }
})

const requestLists = createLogic({
  type: types.REQUEST_LISTS,
  latest: true,
  async process({ httpClient, getState, action: { payload: page = 1 } }, dispatch, done) {
    const {
      sessionId,
      account: { id }
    } = getState()
    const { data } = await httpClient.get(routes.getCreatedLists(id), {
      params: { session_id: sessionId, page }
    })
    dispatch(actions.setLists(data))
    done()
  }
})

const createList = createLogic({
  type: types.CREATE_LIST,
  latest: true,
  async process({ httpClient, getState, action: { payload } }, dispatch, done) {
    const { sessionId } = getState()
    const { data } = await httpClient.post(
      routes.createList,
      { ...payload },
      {
        params: {
          session_id: sessionId
        }
      }
    )
    if (data.success) {
      dispatch(actions.requestLists())
    }
    done()
  }
})

const deleteList = createLogic({
  type: types.DELETE_LIST,
  latest: true,
  async process({ httpClient, getState, action: { payload: id } }, dispatch, done) {
    const { sessionId } = getState()
    await httpClient
      .delete(routes.deleteList(id), {
        params: { session_id: sessionId }
      })
      .finally(() => dispatch(actions.requestLists()))
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
  createList,
  deleteList
]
