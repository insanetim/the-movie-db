import { ListData } from 'src/components/ModalRoot/Modals/ModalCreateList/types'
import { IAccount } from 'src/interfaces/account.interface'
import { IList, IListDetail, IListsList } from 'src/interfaces/list.interface'
import {
  IMovie,
  IMovieAccountStates,
  IMovieCredits,
  IMovieDetail,
  IMovieImages,
  IMoviesList,
} from 'src/interfaces/movie.interface'
import httpClient from 'src/libs/api/httpClient'
import { CreateListResponse } from 'src/store/lists/types'
import { IRequestToken, ISession, IUserData } from 'src/store/session/types'

// Auth
export const createRequestToken = async () => {
  const {
    data: { request_token },
  } = await httpClient.request<IRequestToken>({
    url: '/authentication/token/new',
  })

  return request_token
}

export const validateWithLogin = async ({
  requestToken,
  userData,
}: {
  requestToken: string
  userData: IUserData
}) => {
  await httpClient.request({
    data: { ...userData, request_token: requestToken },
    method: 'post',
    url: '/authentication/token/validate_with_login',
  })
}

export const createSession = async ({
  requestToken,
}: {
  requestToken: string
}) => {
  const {
    data: { session_id },
  } = await httpClient.request<ISession>({
    data: { request_token: requestToken },
    method: 'post',
    url: '/authentication/session/new',
  })

  return session_id
}

export const deleteSession = async ({ sessionId }: { sessionId: string }) => {
  await httpClient.request({
    data: { session_id: sessionId },
    method: 'delete',
    url: '/authentication/session',
  })
}

// Account
export const getAccountDetails = async ({
  sessionId,
}: {
  sessionId: string
}) => {
  const { data } = await httpClient.request<IAccount>({
    params: { session_id: sessionId },
    url: '/account',
  })

  return data
}

// Dashboard
export const getTrending = async ({ page }: { page: string }) => {
  const { data } = await httpClient.request<IMoviesList>({
    params: { page },
    url: '/trending/movie/day',
  })

  return data
}

export const searchMovies = async ({
  page,
  query,
}: {
  page: string
  query: string
}) => {
  const { data } = await httpClient.request<IMoviesList>({
    params: { page, query },
    url: '/search/movie',
  })

  return data
}

// Lists
export const getCreatedLists = async ({
  accountId,
  page,
  sessionId,
}: {
  accountId: IAccount['id']
  page: string
  sessionId: string
}) => {
  const { data } = await httpClient.request<IListsList>({
    params: { page, session_id: sessionId },
    url: `/account/${accountId}/lists`,
  })

  return data
}

export const getListDetails = async ({
  listId,
  page,
}: {
  listId: IList['id']
  page: string
}) => {
  const { data } = await httpClient.request<IListDetail>({
    params: { page },
    url: `/list/${listId}`,
  })

  return data
}

export const createNewList = async ({
  listData,
  sessionId,
}: {
  listData: ListData
  sessionId: string
}) => {
  const {
    data: { list_id },
  } = await httpClient.request<CreateListResponse>({
    data: { ...listData },
    method: 'post',
    params: { session_id: sessionId },
    url: '/list',
  })

  return list_id
}

export const addMovieToList = async ({
  listId,
  movieId,
  sessionId,
}: {
  listId: IList['id']
  movieId: IMovie['id']
  sessionId: string
}) => {
  await httpClient.request({
    data: { media_id: movieId },
    method: 'post',
    params: { session_id: sessionId },
    url: `/list/${listId}/add_item`,
  })
}

export const removeMovieFromList = async ({
  listId,
  movieId,
  sessionId,
}: {
  listId: IList['id']
  movieId: IMovie['id']
  sessionId: string
}) => {
  await httpClient.request({
    data: { media_id: movieId },
    method: 'post',
    params: { session_id: sessionId },
    url: `/list/${listId}/remove_item`,
  })
}

export const deleteMyList = async ({
  listId,
  sessionId,
}: {
  listId: IList['id']
  sessionId: string
}) => {
  await httpClient.request({
    method: 'delete',
    params: { session_id: sessionId },
    url: `/list/${listId}`,
  })
}

// Watchlist
export const getWatchlist = async ({
  accountId,
  page,
  sessionId,
}: {
  accountId: IAccount['id']
  page: string
  sessionId: string
}) => {
  const { data } = await httpClient.request<IMoviesList>({
    params: { page, session_id: sessionId },
    url: `/account/${accountId}/watchlist/movies`,
  })

  return data
}

export const addToWatchlist = async ({
  accountId,
  inWatchlist,
  movieId,
  sessionId,
}: {
  accountId: IAccount['id']
  inWatchlist: boolean
  movieId: IMovie['id']
  sessionId: string
}) => {
  await httpClient.request({
    data: { media_id: movieId, media_type: 'movie', watchlist: inWatchlist },
    method: 'post',
    params: { session_id: sessionId },
    url: `/account/${accountId}/watchlist`,
  })
}

// Favorite
export const getFavorite = async ({
  accountId,
  page,
  sessionId,
}: {
  accountId: IAccount['id']
  page: string
  sessionId: string
}) => {
  const { data } = await httpClient.request<IMoviesList>({
    params: { page, session_id: sessionId },
    url: `/account/${accountId}/favorite/movies`,
  })

  return data
}

export const addToFovorite = async ({
  accountId,
  inFavorite,
  movieId,
  sessionId,
}: {
  accountId: IAccount['id']
  inFavorite: boolean
  movieId: IMovie['id']
  sessionId: string
}) => {
  await httpClient.request({
    data: { favorite: inFavorite, media_id: movieId, media_type: 'movie' },
    method: 'post',
    params: { session_id: sessionId },
    url: `/account/${accountId}/favorite`,
  })
}

// Movie
export const getMovieDetails = async ({
  movieId,
}: {
  movieId: IMovie['id']
}) => {
  const { data } = await httpClient.request<IMovieDetail>({
    url: `/movie/${movieId}`,
  })

  return data
}

export const getMovieImages = async ({
  movieId,
}: {
  movieId: IMovie['id']
}) => {
  const {
    data: { backdrops },
  } = await httpClient.request<IMovieImages>({
    url: `/movie/${movieId}/images`,
  })

  return backdrops.slice(0, 7)
}

export const getMovieAccountStates = async ({
  movieId,
  sessionId,
}: {
  movieId: IMovie['id']
  sessionId: string
}) => {
  const { data } = await httpClient.request<IMovieAccountStates>({
    params: { session_id: sessionId },
    url: `/movie/${movieId}/account_states`,
  })

  return data
}

export const getMovieCredits = async ({
  movieId,
}: {
  movieId: IMovie['id']
}) => {
  const { data } = await httpClient.request<IMovieCredits>({
    url: `/movie/${movieId}/credits`,
  })

  return data
}
