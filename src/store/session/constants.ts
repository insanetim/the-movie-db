import createActionType from 'src/utils/state/createActionType'

const namespace = 'session'

const logIn = createActionType(namespace, 'logIn')
const logOut = createActionType(namespace, 'logOut')
const fetchAccount = createActionType(namespace, 'fetchAccount')

export { fetchAccount, logIn, logOut }
