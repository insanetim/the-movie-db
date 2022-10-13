export const createRequestToken = '/authentication/token/new'
export const createSessionWithLogin = '/authentication/token/validate_with_login'
export const createSession = '/authentication/session/new'
export const deleteSession = '/authentication/session'
export const getDetails = '/account'
export const getTrending = '/trending/movie/day'
export const searchMovies = '/search/movie'
export const getCreatedLists = accountId => `/account/${accountId}/lists`
export const createList = '/list'
export const deleteList = listId => `/list/${listId}`
