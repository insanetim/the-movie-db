import { dispatch, getState } from 'src/__mocks__/react-redux'
import { NOTIFICATION_TYPE } from 'src/constants/app'
import httpClient from 'src/lib/api/httpClient'
import * as routes from 'src/lib/apiRoutes'
import { showNotification } from 'src/store/app/actions'

import {
  addToList,
  createList,
  deleteList,
  fetchListDetail,
  fetchLists,
  removeFromList
} from '../actions'

jest.mock<typeof import('@reduxjs/toolkit')>('@reduxjs/toolkit', () => ({
  ...jest.requireActual('@reduxjs/toolkit'),
  nanoid: () => 'test/id'
}))

jest.mock('src/store/session/selectors', () => ({
  accountSelector: () => ({ id: 123 }),
  sessionIdSelector: () => 'session_id'
}))

jest.mock('src/store/movie/selectors', () => ({
  selectMovieById: () => ({ title: 'test/movie' })
}))

jest.mock('src/store//lists/selectors', () => ({
  listsSelector: () => ({ results: [{ id: 123, name: 'test/list' }] })
}))

describe('lists actions', () => {
  const requestSpy = jest.spyOn(httpClient, 'request')
  const errorNotification = showNotification({
    messageText: 'Something went wrong!',
    messageType: NOTIFICATION_TYPE.ERROR
  })

  describe('fetchLists', () => {
    const thunk = fetchLists('1')

    const request = {
      params: { page: '1', session_id: 'session_id' },
      url: routes.getCreatedLists(123)
    }
    const response = { data: 'test/data' }

    it('should handle success', async () => {
      requestSpy.mockResolvedValueOnce(response)

      const result = await thunk(dispatch, getState, undefined)
      const { calls } = dispatch.mock

      expect(requestSpy).toHaveBeenCalledTimes(1)
      expect(requestSpy).toHaveBeenCalledWith(request)
      expect(calls).toHaveLength(2)
      expect(calls[0][0].type).toBe(fetchLists.pending.type)
      expect(calls[1][0].type).toBe(fetchLists.fulfilled.type)
      expect(result.payload).toEqual(response.data)
    })

    it('should handle failure', async () => {
      requestSpy.mockRejectedValueOnce('Something went wrong!')

      const result = await thunk(dispatch, getState, undefined)
      const { calls } = dispatch.mock

      expect(calls).toHaveLength(2)
      expect(calls[0][0].type).toBe(fetchLists.pending.type)
      expect(calls[1][0].type).toBe(fetchLists.rejected.type)
      expect(result.payload).toBe('Something went wrong!')
    })
  })

  describe('createList', () => {
    const listData = { description: 'test/description', name: 'test/name' }
    const thunk = createList({ listData, movieId: 123 })

    const request = {
      data: { ...listData },
      method: 'post',
      params: { session_id: 'session_id' },
      url: routes.createList
    }
    const response = { data: { list_id: 123 } }

    it('should handle success', async () => {
      requestSpy.mockResolvedValueOnce(response)

      await thunk(dispatch, getState, undefined)
      const { calls } = dispatch.mock

      expect(requestSpy).toHaveBeenCalledTimes(1)
      expect(requestSpy).toHaveBeenCalledWith(request)
      expect(calls).toHaveLength(3)
      expect(calls[0][0].type).toBe(createList.pending.type)
      expect(calls[2][0].type).toBe(createList.fulfilled.type)
    })

    it('should handle success without movieId', async () => {
      requestSpy.mockResolvedValueOnce(response)
      const thunk = createList({ listData })

      await thunk(dispatch, getState, undefined)
      const { calls } = dispatch.mock

      expect(calls).toHaveLength(2)
      expect(calls[0][0].type).toBe(createList.pending.type)
      expect(calls[1][0].type).toBe(createList.fulfilled.type)
    })

    it('should handle failure', async () => {
      requestSpy.mockRejectedValueOnce('Something went wrong!')

      await thunk(dispatch, getState, undefined)
      const { calls } = dispatch.mock

      expect(calls).toHaveLength(3)
      expect(calls[0][0].type).toBe(createList.pending.type)
      expect(calls[1][0].type).toBe(showNotification.type)
      expect(calls[2][0].type).toBe(createList.fulfilled.type)
      expect(dispatch).toHaveBeenCalledWith(errorNotification)
    })
  })

  describe('deleteList', () => {
    const thunk = deleteList('123')

    const request = {
      method: 'delete',
      params: { session_id: 'session_id' },
      url: routes.deleteList('123')
    }
    const response = { data: { success: true } }

    it('should handle success', async () => {
      requestSpy.mockResolvedValueOnce(response)

      await thunk(dispatch, getState, undefined)
      const { calls } = dispatch.mock

      expect(requestSpy).toHaveBeenCalledTimes(1)
      expect(requestSpy).toHaveBeenCalledWith(request)
      expect(calls).toHaveLength(2)
      expect(calls[0][0].type).toBe(deleteList.pending.type)
      expect(calls[1][0].type).toBe(deleteList.fulfilled.type)
    })

    it('should handle failure', async () => {
      requestSpy.mockRejectedValueOnce('Something went wrong!')

      await thunk(dispatch, getState, undefined)
      const { calls } = dispatch.mock

      expect(calls).toHaveLength(3)
      expect(calls[0][0].type).toBe(deleteList.pending.type)
      expect(calls[1][0].type).toBe(showNotification.type)
      expect(calls[2][0].type).toBe(deleteList.fulfilled.type)
      expect(dispatch).toHaveBeenCalledWith(errorNotification)
    })
  })

  describe('fetchListDetail', () => {
    const thunk = fetchListDetail({ listId: '123', page: '1' })

    const request = { params: { page: '1' }, url: routes.getListDetails('123') }
    const response = { data: 'test/data' }

    it('should handle success', async () => {
      requestSpy.mockResolvedValueOnce(response)

      const result = await thunk(dispatch, getState, undefined)
      const { calls } = dispatch.mock

      expect(requestSpy).toHaveBeenCalledTimes(1)
      expect(requestSpy).toHaveBeenCalledWith(request)
      expect(calls).toHaveLength(2)
      expect(calls[0][0].type).toBe(fetchListDetail.pending.type)
      expect(calls[1][0].type).toBe(fetchListDetail.fulfilled.type)
      expect(result.payload).toEqual(response.data)
    })

    it('should handle failure', async () => {
      requestSpy.mockRejectedValueOnce('Something went wrong!')

      const result = await thunk(dispatch, getState, undefined)
      const { calls } = dispatch.mock

      expect(calls).toHaveLength(2)
      expect(calls[0][0].type).toBe(fetchListDetail.pending.type)
      expect(calls[1][0].type).toBe(fetchListDetail.rejected.type)
      expect(result.payload).toBe('Something went wrong!')
    })
  })

  describe('addToList', () => {
    const thunk = addToList({ listId: 123, movieId: 123 })

    const request = {
      data: { media_id: 123 },
      method: 'post',
      params: { session_id: 'session_id' },
      url: routes.addToList(123)
    }
    const response = { data: { success: true } }

    it('should handle success', async () => {
      requestSpy.mockResolvedValueOnce(response)
      const notification = showNotification({
        messageText: 'test/movie added to test/list'
      })

      await thunk(dispatch, getState, undefined)
      const { calls } = dispatch.mock

      expect(requestSpy).toHaveBeenCalledTimes(1)
      expect(requestSpy).toHaveBeenCalledWith(request)
      expect(calls).toHaveLength(4)
      expect(calls[0][0].type).toBe(addToList.pending.type)
      expect(calls[2][0].type).toBe(showNotification.type)
      expect(calls[3][0].type).toBe(addToList.fulfilled.type)
      expect(dispatch).toHaveBeenCalledWith(notification)
    })

    it('should handle failure', async () => {
      requestSpy.mockRejectedValueOnce('Something went wrong!')

      await thunk(dispatch, getState, undefined)
      const { calls } = dispatch.mock

      expect(calls).toHaveLength(3)
      expect(calls[0][0].type).toBe(addToList.pending.type)
      expect(calls[1][0].type).toBe(showNotification.type)
      expect(calls[2][0].type).toBe(addToList.fulfilled.type)
      expect(dispatch).toHaveBeenCalledWith(errorNotification)
    })
  })

  describe('removeFromList', () => {
    const thunk = removeFromList({ listId: 123, movieId: 123 })

    const request = {
      data: { media_id: 123 },
      method: 'post',
      params: { session_id: 'session_id' },
      url: routes.removeFromList(123)
    }
    const response = { data: { success: true } }

    it('should handle success', async () => {
      requestSpy.mockResolvedValueOnce(response)

      await thunk(dispatch, getState, undefined)
      const { calls } = dispatch.mock

      expect(requestSpy).toHaveBeenCalledTimes(1)
      expect(requestSpy).toHaveBeenCalledWith(request)
      expect(calls).toHaveLength(2)
      expect(calls[0][0].type).toBe(removeFromList.pending.type)
      expect(calls[1][0].type).toBe(removeFromList.fulfilled.type)
    })

    it('should handle failure', async () => {
      requestSpy.mockRejectedValueOnce('Something went wrong!')

      await thunk(dispatch, getState, undefined)
      const { calls } = dispatch.mock

      expect(calls).toHaveLength(3)
      expect(calls[0][0].type).toBe(removeFromList.pending.type)
      expect(calls[1][0].type).toBe(showNotification.type)
      expect(calls[2][0].type).toBe(removeFromList.fulfilled.type)
      expect(dispatch).toHaveBeenCalledWith(errorNotification)
    })
  })
})
