import mockHttpClient from 'src/__mocks__/mockHttpClient'
import { showNotification } from 'src/state/app/actions'
import * as types from '../../types'
import { setList } from '../../actions'
import fetchList from '../fetchList'

describe('fetchList', () => {
  let dispatch = null
  const cb = jest.fn()

  const action = {
    type: types.FETCH_LIST,
    payload: 123
  }

  const url = '/list/123'

  const response = {
    data: {
      id: 123,
      items: []
    }
  }

  const beforeFunction = httpClient => () => {
    dispatch = jest.fn()
    fetchList.process(
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
    expect(fetchList).toMatchSnapshot()
  })

  describe('success', () => {
    const httpClient = mockHttpClient({ method: 'get', response })

    beforeEach(beforeFunction(httpClient))

    it('calls right endpoint', () => {
      expect(httpClient.get).toHaveBeenCalledWith(url)
    })

    it('dispatches actions', () => {
      expect(dispatch).toHaveBeenCalledTimes(1)

      expect(dispatch).toHaveBeenNthCalledWith(1, setList(response.data))
    })

    it('does not call callback', () => {
      expect(cb).not.toHaveBeenCalled()
    })
  })

  describe('with callback', () => {
    const httpClient = mockHttpClient({ method: 'get', response })

    const newAction = {
      type: types.FETCH_LIST,
      payload: 123,
      cb
    }

    beforeEach(() => {
      dispatch = jest.fn()
      fetchList.process(
        {
          httpClient,
          action: newAction,
          getState: jest.fn()
        },
        dispatch,
        jest.fn()
      )
    })

    it('calls callback', () => {
      expect(cb).toHaveBeenCalledTimes(1)
    })
  })

  describe('failure', () => {
    const error = new Error('test/error')

    const httpClient = mockHttpClient({
      method: 'get',
      reject: true,
      response: error
    })

    beforeEach(beforeFunction(httpClient))

    it('dispatches actions', () => {
      expect(dispatch).toHaveBeenCalledTimes(1)

      expect(dispatch).toHaveBeenNthCalledWith(1, showNotification({ type: 'error', message: 'test/error' }))
    })
  })
})
