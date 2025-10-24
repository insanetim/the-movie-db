import { InputRef } from 'antd'
import { useRef, useState } from 'react'
import { ListData } from 'src/store/features/list'

import { ModalCreateListHookProps, ModalCreateListHookReturn } from './types'

const useContainer = ({
  closeModal,
  form,
  onSubmit,
}: ModalCreateListHookProps): ModalCreateListHookReturn => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const inputRef = useRef<InputRef>(null)

  const handleOk = () => {
    form.submit()
  }

  const handleSubmit = async (listData: ListData) => {
    setIsSubmitting(true)
    await onSubmit?.(listData)
    setIsSubmitting(false)
    closeModal?.()
  }

  const handleAfterOpenChange = (open: boolean) => {
    if (open) {
      inputRef.current?.focus()
    }
  }

  return {
    handleAfterOpenChange,
    handleOk,
    handleSubmit,
    inputRef,
    isSubmitting,
  }
}

export default useContainer
