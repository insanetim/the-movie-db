import { isNotNil } from 'ramda'
import { useAppDispatch } from 'src/hooks/useRedux'
import { hideModal } from 'src/store/app/actions'
import { createList } from 'src/store/lists/actions'

import {
  ListData,
  ModalCreateListHook,
  ModalCreateListHookProps
} from './types'

const useContainer = ({
  form,
  movieId,
  onSuccess
}: ModalCreateListHookProps): ModalCreateListHook => {
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

  return { handleAfterClose, handleOk, handleSubmit }
}

export default useContainer
