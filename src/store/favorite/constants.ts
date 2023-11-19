import createActionType from 'src/utils/stateHelpers/createActionType'

const namespace = 'favorite'

const fetchFavorite = createActionType(namespace, 'fetchFavorite')

export { fetchFavorite }
