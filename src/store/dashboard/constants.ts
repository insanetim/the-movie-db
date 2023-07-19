import createActionType from 'src/utils/state/createActionType'

const namespace = 'dashboard'

export const FETCH_TRENDING = createActionType(namespace, 'FETCH_TRENDING')
export const FETCH_SEARCH = createActionType(namespace, 'FETCH_SEARCH')
