import { ComponentProps, Dispatch } from 'react'
import { ModalsMap, ModalTypes } from 'src/components/ModalsRoot/types'

export type Modal = {
  [T in ModalTypes]: {
    id: string
    modalProps: ComponentProps<ModalsMap[T]>
    modalType: T
  }
}[ModalTypes]

export type ModalsContextType = {
  dispatch: Dispatch<ModalsReducerAction>
  modals: Modal[]
}

export type ModalsReducerAction = CloseModalAction | OpenModalAction

type CloseModalAction = {
  payload: string
  type: 'CLOSE_MODAL'
}

type OpenModalAction = {
  payload: Modal
  type: 'OPEN_MODAL'
}
