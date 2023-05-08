import { NOTIFICATION_TYPE } from 'src/constants/app'
import httpClient from 'src/lib/api/httpClient'
import * as routes from 'src/lib/apiRoutes'
import { showNotification } from 'src/store/app/actions'
import * as actions from '../actions'

jest.mock<typeof import('@reduxjs/toolkit')>('@reduxjs/toolkit', () => ({
  ...jest.requireActual('@reduxjs/toolkit'),
  nanoid: jest.fn(() => 'nonoid')
}))

jest.mock('src/store/session/selectors', () => ({
  sessionIdSelector: jest.fn(() => 'session_id'),
  accountSelector: jest.fn(() => ({ id: 123 }))
}))

jest.mock('src/store/movie/selectors', () => ({
  movieSelector: jest.fn(() => ({ title: 'test/movie' }))
}))

jest.mock('src/store/lists/selectors', () => ({
  listsSelector: jest.fn(() => ({ results: [{ id: 123, name: 'test/list' }] })),
  listSelector: jest.fn(() => ({ items: [{ id: 123, title: 'tets/movie' }], name: 'test/list' }))
}))

describe('lists actions', () => {
  const dispatch = jest.fn()
  const getState = jest.fn()
  const requestSpy = jest.spyOn(httpClient, 'request')
  const errorNotification = showNotification({
    messageType: NOTIFICATION_TYPE.ERROR,
    messageText: 'Something went wrong!'
  })

  describe('fetchLists', () => {
    const action = actions.fetchLists(1)

    const request = {
      url: routes.getCreatedLists(123),
      params: { session_id: 'session_id', page: 1 }
    }
    const response = { data: 'test/data' }

    it('success', async () => {
      requestSpy.mockResolvedValueOnce(response)

      const result = await action(dispatch, getState, undefined)

      expect(requestSpy).toHaveBeenCalledTimes(1)
      expect(requestSpy).toHaveBeenCalledWith(request)
      expect(result.payload).toEqual(response.data)
    })

    it('failure', async () => {
      requestSpy.mockRejectedValueOnce('Something went wrong!')

      const result = await action(dispatch, getState, undefined)

      expect(result.payload).toBe('Something went wrong!')
    })
  })

  describe('fetchList', () => {
    const action = actions.fetchList('123')

    const request = { url: routes.getListDetails('123') }
    const response = { data: 'test/data' }

    it('success', async () => {
      requestSpy.mockResolvedValueOnce(response)

      const result = await action(dispatch, getState, undefined)

      expect(requestSpy).toHaveBeenCalledTimes(1)
      expect(requestSpy).toHaveBeenCalledWith(request)
      expect(result.payload).toEqual(response.data)
    })

    it('failure', async () => {
      requestSpy.mockRejectedValueOnce('Something went wrong!')

      const result = await action(dispatch, getState, undefined)

      expect(result.payload).toBe('Something went wrong!')
    })
  })

  describe('createList', () => {
    const listData = { name: 'test/name', description: 'test/description' }
    const action = actions.createList({ listData, movieId: 123 })

    const request = {
      url: routes.createList,
      method: 'post',
      params: { session_id: 'session_id' },
      data: { ...listData }
    }
    const response = { data: { list_id: 123 } }

    it('success', async () => {
      requestSpy.mockResolvedValueOnce(response)

      await action(dispatch, getState, undefined)

      expect(requestSpy).toHaveBeenCalledTimes(1)
      expect(requestSpy).toHaveBeenCalledWith(request)
      expect(dispatch.mock.calls.length).toBe(4)
    })

    it('failure', async () => {
      requestSpy.mockRejectedValueOnce('Something went wrong!')

      await action(dispatch, getState, undefined)

      expect(dispatch).toHaveBeenCalledWith(errorNotification)
    })

    it('works without movieId', async () => {
      requestSpy.mockResolvedValueOnce(response)
      const action = actions.createList({ listData })

      await action(dispatch, getState, undefined)

      expect(dispatch.mock.calls.length).toBe(3)
    })
  })

  describe('addToList', () => {
    const action = actions.addToList({ listId: 123, movieId: 123 })

    const request = {
      url: routes.addToList(123),
      method: 'post',
      params: { session_id: 'session_id' },
      data: { media_id: 123 }
    }
    const response = { data: { success: true } }

    it('success', async () => {
      requestSpy.mockResolvedValueOnce(response)

      await action(dispatch, getState, undefined)

      expect(requestSpy).toHaveBeenCalledTimes(1)
      expect(requestSpy).toHaveBeenCalledWith(request)
      expect(dispatch).toHaveBeenCalledWith(
        showNotification({
          messageText: 'test/movie added to test/list'
        })
      )
    })

    it('failure', async () => {
      requestSpy.mockRejectedValueOnce('Something went wrong!')

      await action(dispatch, getState, undefined)

      expect(dispatch).toHaveBeenCalledWith(errorNotification)
    })
  })

  describe('removeFromList', () => {
    const action = actions.removeFromList({ listId: 123, movieId: 123 })

    const request = {
      url: routes.removeFromList(123),
      method: 'post',
      params: { session_id: 'session_id' },
      data: { media_id: 123 }
    }
    const response = { data: { success: true } }

    it('success', async () => {
      requestSpy.mockResolvedValueOnce(response)

      const result = await action(dispatch, getState, undefined)

      expect(requestSpy).toHaveBeenCalledTimes(1)
      expect(requestSpy).toHaveBeenCalledWith(request)
      expect(dispatch.mock.calls.length).toBe(3)
      expect(result.payload).toBe(123)
    })

    it('failure', async () => {
      requestSpy.mockRejectedValueOnce('Something went wrong!')

      await action(dispatch, getState, undefined)

      expect(dispatch).toHaveBeenCalledWith(errorNotification)
    })
  })

  describe('deleteList', () => {
    const action = actions.deleteList('123')

    const request = {
      url: routes.deleteList('123'),
      method: 'delete',
      params: { session_id: 'session_id' }
    }
    const response = { data: { success: true } }

    it('success', async () => {
      requestSpy.mockResolvedValueOnce(response)

      await action(dispatch, getState, undefined)

      expect(requestSpy).toHaveBeenCalledTimes(1)
      expect(requestSpy).toHaveBeenCalledWith(request)
      expect(dispatch.mock.calls.length).toBe(3)
    })

    it('failure', async () => {
      const notification = showNotification({
        messageText: 'test/list list has been removed'
      })
      requestSpy.mockRejectedValueOnce('Something went wrong!')

      await action(dispatch, getState, undefined)

      expect(dispatch).toHaveBeenCalledWith(notification)
    })
  })
})
