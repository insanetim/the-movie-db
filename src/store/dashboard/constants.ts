import createActionType from 'src/utils/state/createActionType'

const namespace = 'dashboard'

export const FETCH_TRENDING = createActionType(namespace, 'FETCH_TRENDING')
export const FETCH_SEARCH = createActionType(namespace, 'FETCH_SEARCH')
export const SET_TRENDING_PAGE = createActionType(namespace, 'SET_TRENDING_PAGE')
export const SET_SEARCH_PAGE = createActionType(namespace, 'SET_SEARCH_PAGE')
