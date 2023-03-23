import mockHttpClient from 'src/__mocks__/httpClientMock'
import * as types from '../../types'
import { fetchListRequest, fetchListSuccess, fetchListFailure } from '../../actions'
import fetchList from '../fetchList'

describe('fetchList', () => {
  const dispatch = jest.fn()
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
      expect(dispatch).toHaveBeenCalledTimes(2)
      expect(dispatch).toHaveBeenNthCalledWith(1, fetchListRequest())
      expect(dispatch).toHaveBeenNthCalledWith(2, fetchListSuccess(response.data))
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
      expect(dispatch).toHaveBeenCalledTimes(2)
      expect(dispatch).toHaveBeenNthCalledWith(1, fetchListRequest())
      expect(dispatch).toHaveBeenNthCalledWith(2, fetchListFailure(error))
    })
  })
})
