import useContainer from './hook'
import MODAL_COMPONENTS from './modalComponents'

const ModalRoot = () => {
  const { modalType, modalProps, onCancel } = useContainer()

  if (!modalType) {
    return null
  }

  const ModalComponent = MODAL_COMPONENTS[modalType]

  return (
    <ModalComponent
      onCancel={onCancel}
      {...modalProps}
    />
  )
}

export default ModalRoot
