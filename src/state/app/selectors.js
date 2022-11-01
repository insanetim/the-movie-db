import * as R from 'ramda'

export const loadingSelector = R.path(['app', 'loading'])
export const modalTypeSelector = R.path(['app', 'modal', 'modalType'])
export const modalPropsSelector = R.path(['app', 'modal', 'modalProps'])
