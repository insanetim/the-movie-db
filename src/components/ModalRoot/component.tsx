import isNull from 'src/utils/helpers/isNull'
import MODAL_COMPONENTS from './modalComponents'
import useContainer from './hook'

const ModalRoot: React.FC = () => {
  const { modalType, modalProps, onCancel } = useContainer()

  if (isNull(modalType)) {
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
