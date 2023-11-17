import createActionType from 'src/utils/state/createActionType'

const namespace = 'favorite'

const fetchFavorite = createActionType(namespace, 'fetchFavorite')

export { fetchFavorite }
