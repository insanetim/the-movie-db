import useContainer from './hook'
import { MODAL_COMPONENTS } from './modalComponents'

const ModalsRoot: React.FC = () => {
  const { closeModal, modals, removeDialog } = useContainer()

  return (
    <>
      {modals.map(modal => {
        const ModalComponent = MODAL_COMPONENTS[modal.modalType]

        return (
          <ModalComponent
            {...modal.modalProps}
            afterClose={() => {
              modal.modalProps.afterClose?.()
              removeDialog(modal.modalId)
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
