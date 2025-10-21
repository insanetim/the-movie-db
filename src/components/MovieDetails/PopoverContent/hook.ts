import { modalComponentsMap } from 'src/components/ModalRoot/modalComponents'
import useHandleError from 'src/hooks/useHandleError'
import { showModal, showNotification } from 'src/store/features/app'
import {
  ListData,
  useAddMovieToListMutation,
  useCreateListMutation,
  useGetListsQuery,
} from 'src/store/features/list'
import { useGetMovieDetailsQuery } from 'src/store/features/movie'
import { useAppDispatch } from 'src/store/hooks'
import listMessage from 'src/utils/helpers/listMessage'

import {
  HandleAddToListProps,
  PopoverContentHookProps,
  PopoverContentHookReturn,
} from './types'

const useContainer = ({
  movieId,
  setPopoverOpen,
}: PopoverContentHookProps): PopoverContentHookReturn => {
  const dispatch = useAppDispatch()
  const { handleError } = useHandleError()

  const { data: movie } = useGetMovieDetailsQuery(movieId)
  const { data: lists } = useGetListsQuery('1')
  const [createList] = useCreateListMutation()
  const [addMovieToList] = useAddMovieToListMutation()

  const handleAddToNewList = async (listData: ListData) => {
    try {
      const { list_id: listId } = await createList(listData).unwrap()
      await addMovieToList({ listId, movieId }).unwrap()
      dispatch(
        showNotification({
          message: listMessage({
            listName: listData.name,
            movieTitle: movie!.title,
            type: 'add',
          }),
        })
      )
    } catch (error) {
      handleError(error)
    }
  }

  const handleOpenCreateListModal = () => {
    dispatch(
      showModal({
        modalProps: { onSubmit: handleAddToNewList },
        modalType: modalComponentsMap.MODAL_CREATE_LIST,
      })
    )
    setPopoverOpen(false)
  }

  const handleAddToList = async ({
    listId,
    listName,
  }: HandleAddToListProps) => {
    try {
      await addMovieToList({ listId, movieId }).unwrap()
      dispatch(
        showNotification({
          message: listMessage({
            listName,
            movieTitle: movie!.title,
            type: 'add',
          }),
        })
      )
    } catch (error) {
      handleError(error)
    }
    setPopoverOpen(false)
  }

  return {
    handleAddToList,
    handleAddToNewList,
    handleOpenCreateListModal,
    lists,
  }
}

export default useContainer
