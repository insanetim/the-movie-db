import isNull from 'src/utils/helpers/isNull'

import useContainer from './hook'
import MODAL_COMPONENTS from './modalComponents'

const ModalRoot: React.FC = () => {
  const { modalProps, modalType, onCancel } = useContainer()

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
