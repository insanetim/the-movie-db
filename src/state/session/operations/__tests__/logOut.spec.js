import Cookies from 'js-cookie'

import mockHttpClient from 'src/__mocks__/mockHttpClient'
import { showNotification } from 'src/state/app/actions'
import * as types from '../../types'
import { deleteSession } from '../../actions'
import logOut from '../logOut'

jest.mock('src/state/session/selectors', () => ({
  sessionIdSelector: jest.fn(() => 'session_id')
}))

jest.spyOn(Cookies, 'remove')

describe('logOut', () => {
  const dispatch = jest.fn()
  const callback = jest.fn()

  const action = {
    type: types.LOG_OUT
  }

  const url = '/authentication/session'

  const body = { data: { session_id: 'session_id' } }

  const response = {
    data: {
      success: true
    }
  }

  const beforeFunction = httpClient => () => {
    logOut.process(
      {
        httpClient,
        action,
        getState: jest.fn()
      },
      dispatch,
      jest.fn()
    )
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('has valid attributes', () => {
    expect(logOut).toMatchSnapshot()
  })

  describe('success', () => {
    const httpClient = mockHttpClient({ method: 'delete', response })

    beforeEach(beforeFunction(httpClient))

    it('calls right endpoint', () => {
      expect(httpClient.delete).toHaveBeenCalledTimes(1)
      expect(httpClient.delete).toHaveBeenCalledWith(url, body)
    })

    it('dispatches actions', () => {
      expect(dispatch).toHaveBeenCalledTimes(1)
      expect(dispatch).toHaveBeenCalledWith(deleteSession())
    })
  })

  describe('callback', () => {
    const httpClient = mockHttpClient({ method: 'delete', response })

    const actionExt = {
      ...action,
      callback
    }

    it('calls callback', async () => {
      await logOut.process(
        {
          httpClient,
          action: actionExt,
          getState: jest.fn()
        },
        dispatch,
        jest.fn()
      )

      expect(callback).toHaveBeenCalledTimes(1)
    })
  })

  describe('failure', () => {
    const error = new Error('test/error')

    const httpClient = mockHttpClient({
      method: 'delete',
      reject: true,
      response: error
    })

    beforeEach(beforeFunction(httpClient))

    it('dispatches actions', () => {
      expect(dispatch).toHaveBeenCalledTimes(1)
      expect(dispatch).toHaveBeenCalledWith(showNotification({ type: 'error', message: 'test/error' }))
    })
  })
})
