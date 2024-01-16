import ModalCreateList from './Modals/ModalCreateList'

export const MODAL_COMPONENTS = {
  MODAL_CREATE_LIST: ModalCreateList,
}

type ModalComponentsMap = {
  [K in keyof typeof MODAL_COMPONENTS]: K
}

export const modalComponentsMap = (
  Object.keys(MODAL_COMPONENTS) as Array<keyof typeof MODAL_COMPONENTS>
).reduce((acc, key) => {
  return { ...acc, key }
}, {} as ModalComponentsMap)
