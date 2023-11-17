import createActionType from 'src/utils/state/createActionType'

const namespace = 'dashboard'

const fetchTrending = createActionType(namespace, 'fetchTrending')
const fetchSearch = createActionType(namespace, 'fetchSearch')

export { fetchSearch, fetchTrending }
