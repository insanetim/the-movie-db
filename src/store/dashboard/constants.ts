import createActionType from 'src/utils/state/createActionType'

const namespace = 'dashboard'

const FETCH_TRENDING = createActionType(namespace, 'FETCH_TRENDING')

const FETCH_SEARCH = createActionType(namespace, 'FETCH_SEARCH')

export { FETCH_SEARCH, FETCH_TRENDING }
