import MODAL_COMPONENTS from './modalComponents'

type ModalsMap = typeof MODAL_COMPONENTS
export type ModalTypes = Extract<keyof ModalsMap, string>
export type ModalProps = React.ComponentProps<ModalsMap[ModalTypes]>

export interface ModalRootHook {
  modalProps: ModalProps | null
  modalType: ModalTypes | null
  onCancel: () => void
}
