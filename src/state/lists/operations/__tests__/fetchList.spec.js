import mockHttpClient from 'src/__mocks__/mockHttpClient'
import { showNotification } from 'src/state/app/actions'
import * as types from '../../types'
import { setList } from '../../actions'
import fetchList from '../fetchList'

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'uuid/v4')
}))

describe('fetchList', () => {
  const dispatch = jest.fn()
  const callback = jest.fn()

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
    fetchList.process(
      {
        httpClient,
        action
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
      expect(httpClient.get).toHaveBeenCalledTimes(1)
      expect(httpClient.get).toHaveBeenCalledWith(url)
    })

    it('dispatches actions', () => {
      expect(dispatch).toHaveBeenCalledTimes(1)
      expect(dispatch).toHaveBeenCalledWith(setList(response.data))
    })
  })

  describe('callback', () => {
    const httpClient = mockHttpClient({ method: 'get', response })

    const actionExt = {
      ...action,
      callback
    }

    it('calls callback', async () => {
      await fetchList.process(
        {
          httpClient,
          action: actionExt
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
      method: 'get',
      reject: true,
      response: error
    })

    beforeEach(beforeFunction(httpClient))

    it('dispatches actions', () => {
      expect(dispatch).toHaveBeenCalledTimes(1)
      expect(dispatch).toHaveBeenCalledWith(showNotification({ messageType: 'error', messageText: 'test/error' }))
    })
  })
})
