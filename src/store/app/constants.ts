import createActionType from 'src/utils/state/createActionType'

const namespace = 'app'

export const SHOW_MODAL = createActionType(namespace, 'SHOW_MODAL')

export const HIDE_MODAL = createActionType(namespace, 'HIDE_MODAL')

export const SHOW_NOTIFICATION = createActionType(namespace, 'SHOW_NOTIFICATION')

export const HIDE_NOTIFICATION = createActionType(namespace, 'HIDE_NOTIFICATION')
