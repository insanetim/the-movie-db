// Auth
export const createRequestToken = '/authentication/token/new'
export const createSessionWithLogin = '/authentication/token/validate_with_login'
export const createSession = '/authentication/session/new'
export const deleteSession = '/authentication/session'
// Account
export const getAccountDetails = '/account'
// Dashboard
export const getTrending = '/trending/movie/day'
export const searchMovies = '/search/movie'
// Lists
export const getCreatedLists = (accountId: number) => `/account/${accountId}/lists`
export const getListDetails = (listId: string | number) => `/list/${listId}`
export const createList = '/list'
export const addToList = (listId: string | number) => `/list/${listId}/add_item`
export const removeFromList = (listId: string | number) => `/list/${listId}/remove_item`
export const deleteList = (listId: string | number) => `/list/${listId}`
// Watchlist
export const getWatchlist = (accountId: number) => `/account/${accountId}/watchlist/movies`
export const addToWatchlist = (accountId: number) => `/account/${accountId}/watchlist`
// Favorite
export const getFavorite = (accountId: number) => `/account/${accountId}/favorite/movies`
export const addToFovorite = (accountId: number) => `/account/${accountId}/favorite`
// Movie
export const getMovieDetails = (movieId: string) => `/movie/${movieId}`
export const getMovieImages = (movieId: string) => `/movie/${movieId}/images`
export const getMovieAccountStates = (movieId: string) => `/movie/${movieId}/account_states`
export const getMovieCredits = (movieId: string) => `/movie/${movieId}/credits`
