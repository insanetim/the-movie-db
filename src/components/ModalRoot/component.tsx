import { isNil } from 'ramda'

import useContainer from './hook'
import { MODAL_COMPONENTS } from './modalComponents'

const ModalRoot: React.FC = () => {
  const { modalProps, modalType, onCancel } = useContainer()

  if (isNil(modalType)) {
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
