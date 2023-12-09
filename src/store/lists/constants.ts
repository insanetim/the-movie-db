import createActionType from 'src/utils/stateHelpers/createActionType'

const namespace = 'lists'

const fetchLists = createActionType(namespace, 'fetchLists')
const createList = createActionType(namespace, 'createList')
const deleteList = createActionType(namespace, 'deleteList')
const fetchListDetail = createActionType(namespace, 'fetchListDetail')
const addToList = createActionType(namespace, 'addToList')
const removeFromList = createActionType(namespace, 'removeFromList')

export {
  addToList,
  createList,
  deleteList,
  fetchListDetail,
  fetchLists,
  removeFromList,
}
