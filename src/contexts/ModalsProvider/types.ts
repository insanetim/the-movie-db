import { ComponentProps, Dispatch } from 'react'
import { ModalsMap, ModalTypes } from 'src/components/ModalsRoot/types'

export type Modal = {
  [T in ModalTypes]: {
    modalId: string
    modalProps: ComponentProps<ModalsMap[T]>
    modalType: T
  }
}[ModalTypes]

export type ModalsContextType = {
  dispatch: Dispatch<ModalsReducerAction>
  modals: Modal[]
}

export type ModalsReducerAction =
  | CloseModalAction
  | OpenModalAction
  | RemoveModalAction

type CloseModalAction = {
  payload: string
  type: 'CLOSE_MODAL'
}

type OpenModalAction = {
  payload: Modal
  type: 'OPEN_MODAL'
}

type RemoveModalAction = {
  payload: string
  type: 'REMOVE_MODAL'
}
