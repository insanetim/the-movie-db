import { InputRef } from 'antd'
import { isNotNil } from 'ramda'
import { useRef } from 'react'
import { useAppDispatch } from 'src/hooks/useRedux'
import { hideModal } from 'src/store/app/actions'
import { createList } from 'src/store/lists/actions'

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

    if (isNotNil(onSuccess)) {
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
