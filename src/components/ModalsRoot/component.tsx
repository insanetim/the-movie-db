import useContainer from './hook'
import { MODAL_COMPONENTS } from './modalComponents'

const ModalsRoot: React.FC = () => {
  const { closeModal, modals, removeModal } = useContainer()

  return (
    <>
      {modals.map(modal => {
        const ModalComponent = MODAL_COMPONENTS[modal.modalType]

        return (
          <ModalComponent
            {...modal.modalProps}
            afterClose={() => {
              modal.modalProps?.afterClose?.()
              removeModal(modal.modalId)
            }}
            key={modal.modalId}
            onCancel={() => closeModal(modal.modalId)}
          />
        )
      })}
    </>
  )
}

export default ModalsRoot
