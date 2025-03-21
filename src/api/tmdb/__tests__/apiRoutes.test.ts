import mockAccount from 'src/__mocks__/mockAccount'
import { mockListDetails, mockListsResponse } from 'src/__mocks__/mockList'
import {
  mockMovieDetailsExtended,
  mockMoviesResponse,
} from 'src/__mocks__/mockMovie'
import { mockPersonDetails } from 'src/__mocks__/mockPerson'

import tmdbClient from '../apiClient'
import * as tmdbRoutes from '../apiRoutes'

describe('tmdbRoutes', () => {
  const requestSpy = jest.spyOn(tmdbClient, 'request')
  const requestToken = 'test/request_token'
  const userData = { password: 'test/password', username: 'test/username' }
  const sessionId = 'test/session_id'
  const page = '1'
  const query = 'test/search'
  const accountId = 1234
  const listId = 1234
  const listData = { description: 'test/description', name: 'test/name' }
  const movieId = 1234
  const personId = 1234

  it('should handle "createRequestToken" request', async () => {
    const request = { url: '/authentication/token/new' }
    const response = {
      data: { request_token: requestToken },
    }
    requestSpy.mockResolvedValueOnce(response)

    const result = await tmdbRoutes.createRequestToken()

    expect(requestSpy).toHaveBeenCalledWith(request)
    expect(result).toEqual(requestToken)
  })

  it('should handle "validateWithLogin" request', async () => {
    const request = {
      data: { ...userData, request_token: requestToken },
      method: 'post',
      url: '/authentication/token/validate_with_login',
    }
    const response = { data: { success: true } }
    requestSpy.mockResolvedValueOnce(response)

    await tmdbRoutes.validateWithLogin({ requestToken, userData })

    expect(requestSpy).toHaveBeenCalledWith(request)
  })

  it('should handle "createSession" request', async () => {
    const request = {
      data: { request_token: requestToken },
      method: 'post',
      url: '/authentication/session/new',
    }
    const response = { data: { session_id: sessionId } }
    requestSpy.mockResolvedValueOnce(response)

    const result = await tmdbRoutes.createSession({ requestToken })

    expect(requestSpy).toHaveBeenCalledWith(request)
    expect(result).toEqual(response.data.session_id)
  })

  it('should handle "deleteSession" request', async () => {
    const request = {
      data: { session_id: sessionId },
      method: 'delete',
      url: '/authentication/session',
    }
    const response = { data: { success: true } }
    requestSpy.mockResolvedValueOnce(response)

    await tmdbRoutes.deleteSession({ sessionId })

    expect(requestSpy).toHaveBeenCalledWith(request)
  })

  it('should handle "getAccountDetails" request', async () => {
    const request = {
      params: { session_id: sessionId },
      url: '/account',
    }
    const response = { data: mockAccount }
    requestSpy.mockResolvedValueOnce(response)

    const result = await tmdbRoutes.getAccountDetails({ sessionId })

    expect(requestSpy).toHaveBeenCalledWith(request)
    expect(result).toEqual(response.data)
  })

  it('should handle "getTrending" request', async () => {
    const request = {
      params: { page },
      url: '/trending/movie/week',
    }
    const response = { data: mockMoviesResponse }
    requestSpy.mockResolvedValueOnce(response)

    const result = await tmdbRoutes.getTrending({ page })

    expect(requestSpy).toHaveBeenCalledWith(request)
    expect(result).toEqual(response.data)
  })

  it('should handle "searchMovies" request', async () => {
    const request = {
      params: { page, query },
      url: '/search/movie',
    }
    const response = { data: mockMoviesResponse }
    requestSpy.mockResolvedValueOnce(response)

    const result = await tmdbRoutes.searchMovies({ page, query })

    expect(requestSpy).toHaveBeenCalledWith(request)
    expect(result).toEqual(response.data)
  })

  it('should handle "getCreatedLists" request', async () => {
    const request = {
      params: { page, session_id: sessionId },
      url: `/account/${accountId}/lists`,
    }
    const response = { data: mockListsResponse }
    requestSpy.mockResolvedValueOnce(response)

    const result = await tmdbRoutes.getCreatedLists({
      accountId,
      page,
      sessionId,
    })

    expect(requestSpy).toHaveBeenCalledWith(request)
    expect(result).toEqual(response.data)
  })

  it('should handle "getListDetails" request', async () => {
    const request = {
      params: { page: '1' },
      url: `/list/${listId}`,
    }
    const response = { data: mockListDetails }
    requestSpy.mockResolvedValueOnce(response)

    const result = await tmdbRoutes.getListDetails({ listId, page })

    expect(requestSpy).toHaveBeenCalledWith(request)
    expect(result).toEqual(response.data)
  })

  it('should handle "createNewList" request', async () => {
    const request = {
      data: listData,
      method: 'post',
      params: { session_id: 'test/session_id' },
      url: '/list',
    }
    const response = { data: { list_id: 1234 } }
    requestSpy.mockResolvedValueOnce(response)

    const result = await tmdbRoutes.createNewList({ listData, sessionId })

    expect(requestSpy).toHaveBeenCalledWith(request)
    expect(result).toEqual(response.data.list_id)
  })

  it('should handle "addMovieToList" request', async () => {
    const request = {
      data: { media_id: 1234 },
      method: 'post',
      params: { session_id: 'test/session_id' },
      url: `/list/${1234}/add_item`,
    }
    const response = { data: { success: true } }
    requestSpy.mockResolvedValueOnce(response)

    await tmdbRoutes.addMovieToList({
      listId: 1234,
      movieId: 1234,
      sessionId: 'test/session_id',
    })

    expect(requestSpy).toHaveBeenCalledWith(request)
  })

  it('should handle "removeMovieFromList" request', async () => {
    const request = {
      data: { media_id: movieId },
      method: 'post',
      params: { session_id: sessionId },
      url: `/list/${listId}/remove_item`,
    }
    const response = { data: { success: true } }
    requestSpy.mockResolvedValueOnce(response)

    await tmdbRoutes.removeMovieFromList({ listId, movieId, sessionId })

    expect(requestSpy).toHaveBeenCalledWith(request)
  })

  it('should handle "deleteMyList" request', async () => {
    const request = {
      method: 'delete',
      params: { session_id: sessionId },
      url: `/list/${1234}`,
    }
    const response = { data: { success: true } }
    requestSpy.mockResolvedValueOnce(response)

    await tmdbRoutes.deleteMyList({ listId, sessionId })

    expect(requestSpy).toHaveBeenCalledWith(request)
  })

  it('should handle "getWatchlist" request', async () => {
    const request = {
      params: { page, session_id: sessionId },
      url: `/account/${accountId}/watchlist/movies`,
    }
    const response = { data: mockMoviesResponse }
    requestSpy.mockResolvedValueOnce(response)

    const result = await tmdbRoutes.getWatchlist({ accountId, page, sessionId })

    expect(requestSpy).toHaveBeenCalledWith(request)
    expect(result).toEqual(mockMoviesResponse)
  })

  it('should handle "addToWatchlist" request', async () => {
    const request = {
      data: { media_id: movieId, media_type: 'movie', watchlist: true },
      method: 'post',
      params: { session_id: sessionId },
      url: `/account/${accountId}/watchlist`,
    }
    const response = { data: { success: true } }
    requestSpy.mockResolvedValueOnce(response)

    await tmdbRoutes.addToWatchlist({
      accountId,
      inWatchlist: true,
      movieId,
      sessionId,
    })

    expect(requestSpy).toHaveBeenCalledWith(request)
  })

  it('should handle "getFavorite" request', async () => {
    const request = {
      params: { page, session_id: sessionId },
      url: `/account/${accountId}/favorite/movies`,
    }
    const response = { data: mockMoviesResponse }
    requestSpy.mockResolvedValueOnce(response)

    const result = await tmdbRoutes.getFavorite({ accountId, page, sessionId })

    expect(requestSpy).toHaveBeenCalledWith(request)
    expect(result).toEqual(mockMoviesResponse)
  })

  it('should handle "addToFovorite" request', async () => {
    const request = {
      data: { favorite: true, media_id: movieId, media_type: 'movie' },
      method: 'post',
      params: { session_id: sessionId },
      url: `/account/${accountId}/favorite`,
    }
    const response = { data: { success: true } }
    requestSpy.mockResolvedValueOnce(response)

    await tmdbRoutes.addToFovorite({
      accountId,
      inFavorite: true,
      movieId,
      sessionId,
    })

    expect(requestSpy).toHaveBeenCalledWith(request)
  })

  it('should handle "getMovieDetails" request', async () => {
    const request = {
      params: {
        append_to_response: 'images,account_states,credits',
        session_id: sessionId,
      },
      url: `/movie/${movieId}`,
    }
    const response = { data: mockMovieDetailsExtended }
    requestSpy.mockResolvedValueOnce(response)

    const result = await tmdbRoutes.getMovieDetails({ movieId, sessionId })

    expect(requestSpy).toHaveBeenCalledWith(request)
    expect(result).toEqual(mockMovieDetailsExtended)
  })

  it('should handle "getPersonDetails" request', async () => {
    const request = {
      params: {
        append_to_response: 'external_ids,movie_credits',
      },
      url: `/person/${personId}`,
    }
    const response = { data: mockPersonDetails }
    requestSpy.mockResolvedValueOnce(response)

    const result = await tmdbRoutes.getPersonDetails({ personId })

    expect(requestSpy).toHaveBeenCalledWith(request)
    expect(result).toEqual(mockPersonDetails)
  })
})
