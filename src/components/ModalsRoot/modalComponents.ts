import ModalCreateList from '../Modals/ModalCreateList'
import { ModalComponentsMap } from './types'

export const MODAL_COMPONENTS = {
  CREATE_LIST: ModalCreateList,
}

export const modalTypes = (
  Object.keys(MODAL_COMPONENTS) as Array<keyof typeof MODAL_COMPONENTS>
).reduce((acc, key) => {
  return { ...acc, [key]: key }
}, {} as ModalComponentsMap)
