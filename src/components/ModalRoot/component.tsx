import useContainer from './hook'
import { MODAL_COMPONENTS } from './modalComponents'

const ModalRoot: React.FC = () => {
  const { modalProps, modalType, onCancel } = useContainer()

  const ModalComponent = modalType && MODAL_COMPONENTS[modalType]

  return ModalComponent ? (
    <ModalComponent
      onCancel={onCancel}
      {...modalProps}
    />
  ) : null
}

export default ModalRoot
