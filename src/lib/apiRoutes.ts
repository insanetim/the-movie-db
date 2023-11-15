import type { IAccount } from 'src/interfaces/account.interface'
import type { IList } from 'src/interfaces/list.interface'
import type { IMovie } from 'src/interfaces/movie.interface'

// Auth
export const createRequestToken = '/authentication/token/new'
export const validateWithLogin = '/authentication/token/validate_with_login'
export const createSession = '/authentication/session/new'
export const deleteSession = '/authentication/session'
// Account
export const getAccountDetails = '/account'
// Dashboard
export const getTrending = '/trending/movie/day'
export const searchMovies = '/search/movie'
// Lists
export const getCreatedLists = (accountId: IAccount['id']) =>
  `/account/${accountId}/lists`
export const getListDetails = (listId: IList['id']) => `/list/${listId}`
export const createList = '/list'
export const addToList = (listId: IList['id']) => `/list/${listId}/add_item`
export const removeFromList = (listId: IList['id']) =>
  `/list/${listId}/remove_item`
export const deleteList = (listId: IList['id']) => `/list/${listId}`
// Watchlist
export const getWatchlist = (accountId: IAccount['id']) =>
  `/account/${accountId}/watchlist/movies`
export const addToWatchlist = (accountId: IAccount['id']) =>
  `/account/${accountId}/watchlist`
// Favorite
export const getFavorite = (accountId: IAccount['id']) =>
  `/account/${accountId}/favorite/movies`
export const addToFovorite = (accountId: IAccount['id']) =>
  `/account/${accountId}/favorite`
// Movie
export const getMovieDetails = (movieId: IMovie['id']) => `/movie/${movieId}`
export const getMovieImages = (movieId: IMovie['id']) =>
  `/movie/${movieId}/images`
export const getMovieAccountStates = (movieId: IMovie['id']) =>
  `/movie/${movieId}/account_states`
export const getMovieCredits = (movieId: IMovie['id']) =>
  `/movie/${movieId}/credits`
