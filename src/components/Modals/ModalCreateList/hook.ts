import { InputRef } from 'antd'
import { useRef } from 'react'
import { createList } from 'src/store/createdLists/actions'
import { hideModal } from 'src/store/features/app'
import { useAppDispatch } from 'src/store/hooks'

import {
  ListData,
  ModalCreateListHookProps,
  ModalCreateListHookReturn,
} from './types'

const useContainer = ({
  form,
  movieId,
  onSuccess,
}: ModalCreateListHookProps): ModalCreateListHookReturn => {
  const inputRef = useRef<InputRef>(null)
  const dispatch = useAppDispatch()

  const handleOk = () => {
    form.submit()
  }

  const handleSubmit = async (listData: ListData) => {
    dispatch(hideModal())
    await dispatch(createList({ listData, movieId }))

    if (onSuccess) {
      onSuccess()
    }
  }

  const handleAfterClose = () => {
    form.resetFields()
  }

  const handleAfterOpenChange = (open: boolean) => {
    if (open) {
      inputRef.current?.focus()
    }
  }

  return {
    handleAfterClose,
    handleAfterOpenChange,
    handleOk,
    handleSubmit,
    inputRef,
  }
}

export default useContainer
