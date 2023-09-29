import { useAppDispatch } from 'src/hooks/useRedux'
import { hideModal } from 'src/store/app/actions'
import { createList } from 'src/store/lists/actions'

import type {
  ListData,
  ModalCreateListHook,
  ModalCreateListHookProps
} from './types'

const useContainer = ({
  form,
  movieId
}: ModalCreateListHookProps): ModalCreateListHook => {
  const dispatch = useAppDispatch()

  const handleOk = () => {
    form.submit()
  }

  const handleSubmit = (listData: ListData) => {
    dispatch(hideModal())
    dispatch(createList({ listData, movieId }))
  }

  const handleAfterClose = () => {
    form.resetFields()
  }

  return { handleAfterClose, handleOk, handleSubmit }
}

export default useContainer
