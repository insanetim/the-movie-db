import createActionType from 'src/utils/state/createActionType'

const namespace = 'lists'

export const FETCH_LISTS = createActionType(namespace, 'FETCH_LISTS')
export const FETCH_LIST = createActionType(namespace, 'FETCH_LIST')
export const CREATE_LIST = createActionType(namespace, 'CREATE_LIST')
export const DELETE_LIST = createActionType(namespace, 'DELETE_LIST')
export const ADD_TO_LIST = createActionType(namespace, 'ADD_TO_LIST')
export const REMOVE_FROM_LIST = createActionType(namespace, 'REMOVE_FROM_LIST')
