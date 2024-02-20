import createActionType from 'src/utils/stateHelpers/createActionType'

const namespace = 'personDetails'

const fetchPersonDetails = createActionType(namespace, 'fetchPersonDetails')

export { fetchPersonDetails }
