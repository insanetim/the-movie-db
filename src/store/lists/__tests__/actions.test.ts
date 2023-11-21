import { dispatch, getState } from 'src/__mocks__/react-redux'
import { NOTIFICATION_TYPE } from 'src/constants/app'
import httpClient from 'src/lib/api/httpClient'
import * as routes from 'src/lib/apiRoutes'
import { showNotification } from 'src/store/app/actions'

import * as actions from '../actions'

jest.mock<typeof import('@reduxjs/toolkit')>('@reduxjs/toolkit', () => ({
  ...jest.requireActual('@reduxjs/toolkit'),
  nanoid: jest.fn(() => 'test/id')
}))

jest.mock('src/store/session/selectors', () => ({
  accountSelector: jest.fn(() => ({ id: 123 })),
  sessionIdSelector: jest.fn(() => 'session_id')
}))

jest.mock('src/store/movie/selectors', () => ({
  selectMovieById: jest.fn(() => ({ title: 'test/movie' }))
}))

jest.mock('src/store/lists/selectors', () => ({
  listSelector: jest.fn(() => ({
    items: [{ id: 123, title: 'tets/movie' }],
    name: 'test/list'
  })),
  listsSelector: jest.fn(() => ({ results: [{ id: 123, name: 'test/list' }] }))
}))

describe('lists actions', () => {
  const requestSpy = jest.spyOn(httpClient, 'request')
  const errorNotification = showNotification({
    messageText: 'Something went wrong!',
    messageType: NOTIFICATION_TYPE.ERROR
  })

  describe('fetchLists', () => {
    const action = actions.fetchLists('1')

    const request = {
      params: { page: '1', session_id: 'session_id' },
      url: routes.getCreatedLists(123)
    }
    const response = { data: 'test/data' }

    it('should handle success', async () => {
      requestSpy.mockResolvedValueOnce(response)

      const result = await action(dispatch, getState, undefined)

      expect(requestSpy).toHaveBeenCalledTimes(1)
      expect(requestSpy).toHaveBeenCalledWith(request)
      expect(result.payload).toEqual(response.data)
    })

    it('should handle failure', async () => {
      requestSpy.mockRejectedValueOnce('Something went wrong!')

      const result = await action(dispatch, getState, undefined)

      expect(result.payload).toBe('Something went wrong!')
    })
  })

  describe('createList', () => {
    const listData = { description: 'test/description', name: 'test/name' }
    const action = actions.createList({ listData, movieId: 123 })

    const request = {
      data: { ...listData },
      method: 'post',
      params: { session_id: 'session_id' },
      url: routes.createList
    }
    const response = { data: { list_id: 123 } }

    it('should handle success', async () => {
      requestSpy.mockResolvedValueOnce(response)

      await action(dispatch, getState, undefined)

      expect(requestSpy).toHaveBeenCalledTimes(1)
      expect(requestSpy).toHaveBeenCalledWith(request)
      expect(dispatch.mock.calls.length).toBe(3)
    })

    it('should handle failure', async () => {
      requestSpy.mockRejectedValueOnce('Something went wrong!')

      await action(dispatch, getState, undefined)

      expect(dispatch).toHaveBeenCalledWith(errorNotification)
    })

    it('works without movieId', async () => {
      requestSpy.mockResolvedValueOnce(response)
      const action = actions.createList({ listData })

      await action(dispatch, getState, undefined)

      expect(dispatch.mock.calls.length).toBe(2)
    })
  })

  describe('deleteList', () => {
    const action = actions.deleteList('123')

    const request = {
      method: 'delete',
      params: { session_id: 'session_id' },
      url: routes.deleteList('123')
    }
    const response = { data: { success: true } }

    it('should handle success', async () => {
      requestSpy.mockResolvedValueOnce(response)

      await action(dispatch, getState, undefined)

      expect(requestSpy).toHaveBeenCalledTimes(1)
      expect(requestSpy).toHaveBeenCalledWith(request)
      expect(dispatch.mock.calls.length).toBe(2)
    })

    it('should handle failure', async () => {
      requestSpy.mockRejectedValueOnce('Something went wrong!')

      await action(dispatch, getState, undefined)

      expect(dispatch).toHaveBeenCalledWith(errorNotification)
    })
  })

  describe('fetchListDetail', () => {
    const action = actions.fetchListDetail({ listId: '123', page: '1' })

    const request = { params: { page: '1' }, url: routes.getListDetails('123') }
    const response = { data: 'test/data' }

    it('should handle success', async () => {
      requestSpy.mockResolvedValueOnce(response)

      const result = await action(dispatch, getState, undefined)

      expect(requestSpy).toHaveBeenCalledTimes(1)
      expect(requestSpy).toHaveBeenCalledWith(request)
      expect(result.payload).toEqual(response.data)
    })

    it('should handle failure', async () => {
      requestSpy.mockRejectedValueOnce('Something went wrong!')

      const result = await action(dispatch, getState, undefined)

      expect(result.payload).toBe('Something went wrong!')
    })
  })

  describe('addToList', () => {
    const action = actions.addToList({ listId: 123, movieId: 123 })

    const request = {
      data: { media_id: 123 },
      method: 'post',
      params: { session_id: 'session_id' },
      url: routes.addToList(123)
    }
    const response = { data: { success: true } }

    it('should handle success', async () => {
      const notification = showNotification({
        messageText: 'test/movie added to test/list'
      })
      requestSpy.mockResolvedValueOnce(response)

      await action(dispatch, getState, undefined)

      expect(requestSpy).toHaveBeenCalledTimes(1)
      expect(requestSpy).toHaveBeenCalledWith(request)
      expect(dispatch.mock.calls.length).toBe(4)
      expect(dispatch).toHaveBeenCalledWith(notification)
    })

    it('should handle failure', async () => {
      requestSpy.mockRejectedValueOnce('Something went wrong!')

      await action(dispatch, getState, undefined)

      expect(dispatch).toHaveBeenCalledWith(errorNotification)
    })
  })

  describe('removeFromList', () => {
    const action = actions.removeFromList({ listId: 123, movieId: 123 })

    const request = {
      data: { media_id: 123 },
      method: 'post',
      params: { session_id: 'session_id' },
      url: routes.removeFromList(123)
    }
    const response = { data: { success: true } }

    it('should handle success', async () => {
      requestSpy.mockResolvedValueOnce(response)

      await action(dispatch, getState, undefined)

      expect(requestSpy).toHaveBeenCalledTimes(1)
      expect(requestSpy).toHaveBeenCalledWith(request)
      expect(dispatch.mock.calls.length).toBe(2)
    })

    it('should handle failure', async () => {
      requestSpy.mockRejectedValueOnce('Something went wrong!')

      await action(dispatch, getState, undefined)

      expect(dispatch).toHaveBeenCalledWith(errorNotification)
    })
  })
})
