import { path } from 'ramda'

export const loadingSelector = path(['app', 'loading'])
export const modalTypeSelector = path(['app', 'modal', 'modalType'])
export const modalPropsSelector = path(['app', 'modal', 'modalProps'])
export const notificationsSelector = path(['app', 'notifications'])
