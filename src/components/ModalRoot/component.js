import React from 'react'

import useContainer from './hook'
import MODAL_COMPONENTS from './modalComponents'

const ModalRoot = () => {
  const { modalType, modalProps, onCancel } = useContainer()

  if (!modalType) {
    return null
  }

  const SpecificModal = MODAL_COMPONENTS[modalType]

  return (
    <SpecificModal
      onCancel={onCancel}
      {...modalProps}
    />
  )
}

export default ModalRoot
