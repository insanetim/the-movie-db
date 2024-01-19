import createActionType from 'src/utils/stateHelpers/createActionType'

const namespace = 'listDetails'

const fetchListDetails = createActionType(namespace, 'fetchListDetails')

export { fetchListDetails }
