import createActionType from 'src/utils/state/createActionType'

const namespace = 'app'

const SHOW_MODAL = createActionType(namespace, 'SHOW_MODAL')

const HIDE_MODAL = createActionType(namespace, 'HIDE_MODAL')

const SHOW_NOTIFICATION = createActionType(namespace, 'SHOW_NOTIFICATION')

const HIDE_NOTIFICATION = createActionType(namespace, 'HIDE_NOTIFICATION')

export { HIDE_MODAL, HIDE_NOTIFICATION, SHOW_MODAL, SHOW_NOTIFICATION }
