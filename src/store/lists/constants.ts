import createActionType from 'src/utils/state/createActionType'

const namespace = 'lists'

const FETCH_LISTS = createActionType(namespace, 'FETCH_LISTS')

const CREATE_LIST = createActionType(namespace, 'CREATE_LIST')

const DELETE_LIST = createActionType(namespace, 'DELETE_LIST')

const FETCH_LIST_DETAIL = createActionType(namespace, 'FETCH_LIST_DETAIL')

const ADD_TO_LIST = createActionType(namespace, 'ADD_TO_LIST')

const REMOVE_FROM_LIST = createActionType(namespace, 'REMOVE_FROM_LIST')

export {
  ADD_TO_LIST,
  CREATE_LIST,
  DELETE_LIST,
  FETCH_LIST_DETAIL,
  FETCH_LISTS,
  REMOVE_FROM_LIST
}
