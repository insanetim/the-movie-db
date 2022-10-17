export const createRequestToken = '/authentication/token/new'
export const createSessionWithLogin = '/authentication/token/validate_with_login'
export const createSession = '/authentication/session/new'
export const deleteSession = '/authentication/session'
export const getAccountDetails = '/account'
export const getTrending = '/trending/movie/day'
export const searchMovies = '/search/movie'
export const getCreatedLists = accountId => `/account/${accountId}/lists`
export const getListDetails = listId => `/list/${listId}`
export const createList = '/list'
export const deleteList = listId => `/list/${listId}`
export const getWatchlist = accountId => `/account/${accountId}/watchlist/movies`
export const getFavorites = accountId => `/account/${accountId}/favorite/movies`
export const getMovieDetails = movieId => `/movie/${movieId}`
export const getMovieCredits = movieId => `/movie/${movieId}/credits`
export const getMovieImages = movieId => `/movie/${movieId}/images`
export const getMovieAccountStates = movieId => `/movie/${movieId}/account_states`
export const addToFovorite = accountId => `/account/${accountId}/favorite`
export const addToWatchlist = accountId => `/account/${accountId}/watchlist`
