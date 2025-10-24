import useContainer from './hook'
import { MODAL_COMPONENTS } from './modalComponents'

const ModalsRoot: React.FC = () => {
  const { closeModal, modals } = useContainer()

  return (
    <>
      {modals.map(modal => {
        const ModalComponent = MODAL_COMPONENTS[modal.modalType]

        return (
          <ModalComponent
            key={modal.id}
            onCancel={() => closeModal(modal.id)}
            {...modal.modalProps}
          />
        )
      })}
    </>
  )
}

export default ModalsRoot
