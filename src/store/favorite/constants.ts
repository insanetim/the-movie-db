import createActionType from 'src/utils/state/createActionType'

const namespace = 'favorite'

const FETCH_FAVORITE = createActionType(namespace, 'FETCH_FAVORITE')

export { FETCH_FAVORITE }
