import { ComponentProps } from 'react'
import { Modal } from 'src/contexts/ModalsProvider/types'

import { MODAL_COMPONENTS } from './modalComponents'

export type ModalComponentsMap = {
  [K in keyof typeof MODAL_COMPONENTS]: K
}

export type ModalProps = ComponentProps<ModalsMap[ModalTypes]>

export type ModalRootHookReturn = {
  closeModal: (id: string) => void
  modals: Modal[]
}

export type ModalsMap = typeof MODAL_COMPONENTS

export type ModalTypes = Extract<keyof ModalsMap, string>
