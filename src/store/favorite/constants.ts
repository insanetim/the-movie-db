import createActionType from 'src/utils/state/createActionType'

const namespace = 'favorite'

export const FETCH_FAVORITE = createActionType(namespace, 'FETCH_FAVORITE')
