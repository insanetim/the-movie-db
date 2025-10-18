import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { modalComponentsMap } from 'src/components/ModalRoot/modalComponents'
import useHandleError from 'src/hooks/useHandleError'
import { showModal, showNotification } from 'src/store/features/app'
import {
  ListData,
  useAddMovieToListMutation,
  useCreateListMutation,
  useGetListsQuery,
} from 'src/store/features/lists'
import { useGetMovieDetailsQuery } from 'src/store/features/movies'
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

  const handleAddToNewList = () => {
    const onSubmit = async (listData: ListData) => {
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
        handleError(error as FetchBaseQueryError)
      }
    }

    dispatch(
      showModal({
        modalProps: { onSubmit },
        modalType: modalComponentsMap.MODAL_CREATE_LIST,
      })
    )
    setPopoverOpen(false)

    return { onSubmit }
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
      handleError(error as FetchBaseQueryError)
    }
    setPopoverOpen(false)
  }

  return { handleAddToList, handleAddToNewList, lists }
}

export default useContainer
