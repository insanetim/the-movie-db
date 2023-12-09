import { mockListDetail, mockListsResponse } from 'src/__mocks__/mockList'
import { dispatch, getState } from 'src/__mocks__/react-redux'
import { NOTIFICATION_TYPE } from 'src/constants/app'
import * as apiRoutes from 'src/libs/apiRoutes'
import { showNotification } from 'src/store/app/actions'

import {
  addToList,
  createList,
  deleteList,
  fetchListDetail,
  fetchLists,
  removeFromList,
} from '../actions'

jest.mock<typeof import('@reduxjs/toolkit')>('@reduxjs/toolkit', () => ({
  ...jest.requireActual('@reduxjs/toolkit'),
  nanoid: () => 'test/id',
}))

const accountId = 1234
const sessionId = 'test/session_id'
jest.mock('src/store/session/selectors', () => ({
  accountSelector: () => ({ id: accountId }),
  sessionIdSelector: () => sessionId,
}))

jest.mock('src/store/movie/selectors', () => ({
  selectMovieById: () => ({ title: 'test/movie' }),
}))

const listId = 1234
jest.mock('src/store//lists/selectors', () => ({
  listsSelector: () => ({ results: [{ id: listId, name: 'test/list' }] }),
}))

describe('lists actions', () => {
  const addMovieToList = jest.spyOn(apiRoutes, 'addMovieToList')
  const createNewList = jest.spyOn(apiRoutes, 'createNewList')
  const deleteMyList = jest.spyOn(apiRoutes, 'deleteMyList')
  const getCreatedLists = jest.spyOn(apiRoutes, 'getCreatedLists')
  const getListDetails = jest.spyOn(apiRoutes, 'getListDetails')
  const removeMovieFromList = jest.spyOn(apiRoutes, 'removeMovieFromList')
  const errorMessage = 'Something went wrong!'
  const errorNotification = showNotification({
    messageText: errorMessage,
    messageType: NOTIFICATION_TYPE.ERROR,
  })
  const listData = { description: 'test/description', name: 'test/list' }
  const listName = listData.name
  const movieId = 1234
  const page = '1'

  describe('fetchLists', () => {
    const thunk = fetchLists(page)

    it('should handle success', async () => {
      getCreatedLists.mockResolvedValueOnce(mockListsResponse)

      const result = await thunk(dispatch, getState, undefined)
      const { calls } = dispatch.mock

      expect(getCreatedLists).toHaveBeenCalledWith({
        accountId,
        page,
        sessionId,
      })
      expect(calls).toHaveLength(2)
      expect(calls[0][0].type).toBe(fetchLists.pending.type)
      expect(calls[1][0].type).toBe(fetchLists.fulfilled.type)
      expect(result.payload).toEqual(mockListsResponse)
    })

    it('should handle failure', async () => {
      getCreatedLists.mockRejectedValueOnce(errorMessage)

      const result = await thunk(dispatch, getState, undefined)
      const { calls } = dispatch.mock

      expect(calls).toHaveLength(2)
      expect(calls[0][0].type).toBe(fetchLists.pending.type)
      expect(calls[1][0].type).toBe(fetchLists.rejected.type)
      expect(result.payload).toBe(errorMessage)
    })
  })

  describe('createList', () => {
    const thunk = createList({ listData, movieId })

    it('should handle success', async () => {
      createNewList.mockResolvedValueOnce(listId)

      await thunk(dispatch, getState, undefined)
      const { calls } = dispatch.mock

      expect(createNewList).toHaveBeenCalledWith({ listData, sessionId })
      expect(calls).toHaveLength(3)
      expect(calls[0][0].type).toBe(createList.pending.type)
      expect(calls[2][0].type).toBe(createList.fulfilled.type)
    })

    it('should handle success without movieId', async () => {
      const thunk = createList({ listData })
      createNewList.mockResolvedValueOnce(listId)

      await thunk(dispatch, getState, undefined)
      const { calls } = dispatch.mock

      expect(calls).toHaveLength(2)
      expect(calls[0][0].type).toBe(createList.pending.type)
      expect(calls[1][0].type).toBe(createList.fulfilled.type)
    })

    it('should handle failure', async () => {
      createNewList.mockRejectedValueOnce(errorMessage)

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
    const thunk = deleteList(listId)

    it('should handle success', async () => {
      deleteMyList.mockResolvedValueOnce()

      await thunk(dispatch, getState, undefined)
      const { calls } = dispatch.mock

      expect(deleteMyList).toHaveBeenCalledWith({ listId, sessionId })
      expect(calls).toHaveLength(2)
      expect(calls[0][0].type).toBe(deleteList.pending.type)
      expect(calls[1][0].type).toBe(deleteList.fulfilled.type)
    })

    it('should handle failure', async () => {
      deleteMyList.mockRejectedValueOnce(errorMessage)

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
    const thunk = fetchListDetail({ listId, page })

    it('should handle success', async () => {
      getListDetails.mockResolvedValueOnce(mockListDetail)

      const result = await thunk(dispatch, getState, undefined)
      const { calls } = dispatch.mock

      expect(getListDetails).toHaveBeenCalledWith({ listId, page })
      expect(calls).toHaveLength(2)
      expect(calls[0][0].type).toBe(fetchListDetail.pending.type)
      expect(calls[1][0].type).toBe(fetchListDetail.fulfilled.type)
      expect(result.payload).toEqual(mockListDetail)
    })

    it('should handle failure', async () => {
      getListDetails.mockRejectedValueOnce(errorMessage)

      const result = await thunk(dispatch, getState, undefined)
      const { calls } = dispatch.mock

      expect(calls).toHaveLength(2)
      expect(calls[0][0].type).toBe(fetchListDetail.pending.type)
      expect(calls[1][0].type).toBe(fetchListDetail.rejected.type)
      expect(result.payload).toBe(errorMessage)
    })
  })

  describe('addToList', () => {
    const thunk = addToList({ listId, listName, movieId })

    it('should handle success', async () => {
      addMovieToList.mockResolvedValueOnce()
      const notification = showNotification({
        messageText: 'test/movie added to test/list',
      })

      await thunk(dispatch, getState, undefined)
      const { calls } = dispatch.mock

      expect(addMovieToList).toHaveBeenCalledWith({
        listId,
        movieId,
        sessionId,
      })
      expect(calls).toHaveLength(4)
      expect(calls[0][0].type).toBe(addToList.pending.type)
      expect(calls[1][0].type).toBe(showNotification.type)
      expect(calls[3][0].type).toBe(addToList.fulfilled.type)
      expect(dispatch).toHaveBeenCalledWith(notification)
    })

    it('should handle failure', async () => {
      addMovieToList.mockRejectedValueOnce(errorMessage)

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
    const thunk = removeFromList({ listId, movieId })

    it('should handle success', async () => {
      removeMovieFromList.mockResolvedValueOnce()

      await thunk(dispatch, getState, undefined)
      const { calls } = dispatch.mock

      expect(removeMovieFromList).toHaveBeenCalledWith({
        listId,
        movieId,
        sessionId,
      })
      expect(calls).toHaveLength(2)
      expect(calls[0][0].type).toBe(removeFromList.pending.type)
      expect(calls[1][0].type).toBe(removeFromList.fulfilled.type)
    })

    it('should handle failure', async () => {
      removeMovieFromList.mockRejectedValueOnce(errorMessage)

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
