import { ComponentProps } from 'react'

import { MODAL_COMPONENTS } from './modalComponents'

export type ModalComponentsMap = {
  [K in keyof typeof MODAL_COMPONENTS]: K
}

export type ModalProps = ComponentProps<ModalsMap[ModalTypes]>

export type ModalRootHookReturn = {
  modalProps: ModalProps | null
  modalType: ModalTypes | null
  onCancel: () => void
}

export type ModalsMap = typeof MODAL_COMPONENTS

export type ModalTypes = Extract<keyof ModalsMap, string>
