import { InputRef } from 'antd'
import { useRef } from 'react'
import { hideModal } from 'src/store/features/app'
import { ListData } from 'src/store/features/lists'
import { useAppDispatch } from 'src/store/hooks'

import { ModalCreateListHookProps, ModalCreateListHookReturn } from './types'

const useContainer = ({
  form,
  onSubmit,
}: ModalCreateListHookProps): ModalCreateListHookReturn => {
  const inputRef = useRef<InputRef>(null)
  const dispatch = useAppDispatch()

  const handleOk = () => {
    form.submit()
  }

  const handleSubmit = async (listData: ListData) => {
    dispatch(hideModal())
    await onSubmit?.(listData)
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
  }
}

export default useContainer
