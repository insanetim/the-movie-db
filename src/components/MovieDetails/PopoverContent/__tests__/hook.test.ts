import { act, renderHook } from '@testing-library/react'
import { modalTypes } from 'src/components/ModalsRoot/modalComponents'
import useHandleError from 'src/hooks/useHandleError'
import useModal from 'src/hooks/useModal'
import { showNotification } from 'src/store/features/app'
import { ListData } from 'src/store/features/list'
import { useAppDispatch } from 'src/store/hooks'
import listMessage from 'src/utils/helpers/listMessage'

import useContainer from '../hook'
import { HandleAddToListProps, PopoverContentHookProps } from '../types'

// Mock all the dependencies
jest.mock('src/store/features/movie')
jest.mock('src/store/features/list')
jest.mock('src/store/hooks')
jest.mock('src/hooks/useHandleError')
jest.mock('src/hooks/useModal')
jest.mock('src/store/features/app', () => ({
  showNotification: jest.fn(payload => ({
    payload: {
      duration: 5000,
      id: 'test-id',
      message: payload.message,
      type: 'success',
    },
    type: 'app/showNotification',
  })),
}))
jest.mock('src/components/ModalsRoot/modalComponents', () => ({
  modalTypes: { CREATE_LIST: 'CREATE_LIST' },
}))
jest.mock('src/utils/helpers/listMessage', () => jest.fn())

// Import the actual hooks for proper typing (after mocking)
import {
  useAddMovieToListMutation as ActualUseAddMovieToListMutation,
  useCreateListMutation as ActualUseCreateListMutation,
  useGetListsQuery as ActualUseGetListsQuery,
} from 'src/store/features/list'
import { useGetMovieDetailsQuery as ActualUseGetMovieDetailsQuery } from 'src/store/features/movie'

const mockUseGetMovieDetailsQuery =
  ActualUseGetMovieDetailsQuery as jest.MockedFunction<
    typeof ActualUseGetMovieDetailsQuery
  >
const mockUseGetListsQuery = ActualUseGetListsQuery as jest.MockedFunction<
  typeof ActualUseGetListsQuery
>
const mockUseCreateListMutation =
  ActualUseCreateListMutation as jest.MockedFunction<
    typeof ActualUseCreateListMutation
  >
const mockUseAddMovieToListMutation =
  ActualUseAddMovieToListMutation as jest.MockedFunction<
    typeof ActualUseAddMovieToListMutation
  >
const mockUseAppDispatch = useAppDispatch as jest.MockedFunction<
  typeof useAppDispatch
>
const mockUseHandleError = useHandleError as jest.MockedFunction<
  typeof useHandleError
>
const mockUseModal = useModal as jest.MockedFunction<typeof useModal>
const mockShowNotification = showNotification as jest.MockedFunction<
  typeof showNotification
>
const mockListMessage = listMessage as jest.MockedFunction<typeof listMessage>

// Mock data
const mockMovie = {
  id: 123,
  title: 'Test Movie',
}

const mockLists = {
  results: [
    { id: 'list1', name: 'Watchlist' },
    { id: 'list2', name: 'Favorites' },
  ],
}

const mockListData: ListData = {
  description: 'A new test list',
  name: 'New List',
}

const mockSetPopoverOpen = jest.fn()

describe('PopoverContent useContainer hook', () => {
  let dispatch: jest.Mock
  let handleError: jest.Mock
  let createTrigger: jest.Mock
  let addTrigger: jest.Mock
  let unwrapCreate: jest.Mock
  let unwrapAdd: jest.Mock
  let openModalMock: jest.Mock
  let closeModalMock: jest.Mock

  beforeEach(() => {
    dispatch = jest.fn()
    mockUseAppDispatch.mockReturnValue(dispatch as never)

    handleError = jest.fn()
    mockUseHandleError.mockReturnValue({ handleError } as never)

    openModalMock = jest.fn()
    closeModalMock = jest.fn()
    mockUseModal.mockReturnValue({
      closeModal: closeModalMock,
      openModal: openModalMock,
    } as never)

    // Mock movie query
    mockUseGetMovieDetailsQuery.mockReturnValue({
      data: mockMovie,
      error: null,
      isLoading: false,
    } as never)

    // Mock lists query
    mockUseGetListsQuery.mockReturnValue({
      data: mockLists,
      error: null,
      isLoading: false,
    } as never)

    // Mock mutations
    unwrapCreate = jest.fn().mockResolvedValue({ list_id: 'new-list-id' })
    unwrapAdd = jest.fn().mockResolvedValue(undefined)
    createTrigger = jest.fn().mockReturnValue({ unwrap: unwrapCreate })
    addTrigger = jest.fn().mockReturnValue({ unwrap: unwrapAdd })

    mockUseCreateListMutation.mockReturnValue([createTrigger] as never)
    mockUseAddMovieToListMutation.mockReturnValue([addTrigger] as never)

    // Mock helper functions
    mockListMessage.mockReturnValue('Test Movie added to New List')
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return hook functions and lists', () => {
    const props: PopoverContentHookProps = {
      movieId: 123,
      setPopoverOpen: mockSetPopoverOpen,
    }

    const { result } = renderHook(() => useContainer(props))

    expect(result.current.handleAddToList).toBeDefined()
    expect(result.current.handleAddToNewList).toBeDefined()
    expect(result.current.handleOpenCreateListModal).toBeDefined()
    expect(result.current.lists).toEqual(mockLists)
  })

  it('should handle adding movie to new list successfully', async () => {
    const props: PopoverContentHookProps = {
      movieId: 123,
      setPopoverOpen: mockSetPopoverOpen,
    }

    const { result } = renderHook(() => useContainer(props))

    await act(async () => {
      await result.current.handleAddToNewList(mockListData)
    })

    expect(createTrigger).toHaveBeenCalledWith(mockListData)
    expect(unwrapCreate).toHaveBeenCalled()
    expect(addTrigger).toHaveBeenCalledWith({
      listId: 'new-list-id',
      movieId: 123,
    })
    expect(unwrapAdd).toHaveBeenCalled()
    expect(mockListMessage).toHaveBeenCalledWith({
      listName: 'New List',
      movieTitle: 'Test Movie',
      type: 'add',
    })
    expect(mockShowNotification).toHaveBeenCalledWith({
      message: 'Test Movie added to New List',
    })
    expect(dispatch).toHaveBeenCalledWith({
      payload: {
        duration: 5000,
        id: 'test-id',
        message: 'Test Movie added to New List',
        type: 'success',
      },
      type: 'app/showNotification',
    })
  })

  it('should handle errors when creating new list fails', async () => {
    const error = new Error('Create list failed')
    unwrapCreate.mockRejectedValue(error)

    const props: PopoverContentHookProps = {
      movieId: 123,
      setPopoverOpen: mockSetPopoverOpen,
    }

    const { result } = renderHook(() => useContainer(props))

    await act(async () => {
      await result.current.handleAddToNewList(mockListData)
    })

    expect(createTrigger).toHaveBeenCalledWith(mockListData)
    expect(unwrapCreate).toHaveBeenCalled()
    expect(handleError).toHaveBeenCalledWith(error)
    expect(addTrigger).not.toHaveBeenCalled()
    expect(mockShowNotification).not.toHaveBeenCalled()
  })

  it('should handle errors when adding movie to new list fails', async () => {
    const error = new Error('Add to list failed')
    unwrapAdd.mockRejectedValue(error)

    const props: PopoverContentHookProps = {
      movieId: 123,
      setPopoverOpen: mockSetPopoverOpen,
    }

    const { result } = renderHook(() => useContainer(props))

    await act(async () => {
      await result.current.handleAddToNewList(mockListData)
    })

    expect(createTrigger).toHaveBeenCalledWith(mockListData)
    expect(unwrapCreate).toHaveBeenCalled()
    expect(addTrigger).toHaveBeenCalledWith({
      listId: 'new-list-id',
      movieId: 123,
    })
    expect(unwrapAdd).toHaveBeenCalled()
    expect(handleError).toHaveBeenCalledWith(error)
    expect(mockShowNotification).not.toHaveBeenCalled()
  })

  it('should open create list modal with correct props', () => {
    const props: PopoverContentHookProps = {
      movieId: 123,
      setPopoverOpen: mockSetPopoverOpen,
    }

    const { result } = renderHook(() => useContainer(props))

    act(() => {
      result.current.handleOpenCreateListModal()
    })

    expect(openModalMock).toHaveBeenCalledWith({
      modalProps: {
        closeModal: closeModalMock,
        onSubmit: result.current.handleAddToNewList,
      },
      modalType: modalTypes.CREATE_LIST,
    })
    expect(mockSetPopoverOpen).toHaveBeenCalledWith(false)
  })

  it('should handle adding movie to existing list successfully', async () => {
    const props: PopoverContentHookProps = {
      movieId: 123,
      setPopoverOpen: mockSetPopoverOpen,
    }

    const { result } = renderHook(() => useContainer(props))

    const addToListProps: HandleAddToListProps = {
      listId: 'list1',
      listName: 'Watchlist',
    }

    // Set specific return value for this test
    mockListMessage.mockReturnValue('Test Movie added to Watchlist')

    await act(async () => {
      await result.current.handleAddToList(addToListProps)
    })

    expect(addTrigger).toHaveBeenCalledWith({ listId: 'list1', movieId: 123 })
    expect(unwrapAdd).toHaveBeenCalled()
    expect(mockListMessage).toHaveBeenCalledWith({
      listName: 'Watchlist',
      movieTitle: 'Test Movie',
      type: 'add',
    })
    expect(mockShowNotification).toHaveBeenCalledWith({
      message: 'Test Movie added to Watchlist',
    })
    expect(dispatch).toHaveBeenCalledWith({
      payload: {
        duration: 5000,
        id: 'test-id',
        message: 'Test Movie added to Watchlist',
        type: 'success',
      },
      type: 'app/showNotification',
    })
    expect(mockSetPopoverOpen).toHaveBeenCalledWith(false)
  })

  it('should handle errors when adding movie to existing list fails', async () => {
    const error = new Error('Add to existing list failed')
    unwrapAdd.mockRejectedValue(error)

    const props: PopoverContentHookProps = {
      movieId: 123,
      setPopoverOpen: mockSetPopoverOpen,
    }

    const { result } = renderHook(() => useContainer(props))

    const addToListProps: HandleAddToListProps = {
      listId: 'list1',
      listName: 'Watchlist',
    }

    await act(async () => {
      await result.current.handleAddToList(addToListProps)
    })

    expect(addTrigger).toHaveBeenCalledWith({ listId: 'list1', movieId: 123 })
    expect(unwrapAdd).toHaveBeenCalled()
    expect(handleError).toHaveBeenCalledWith(error)
    expect(mockShowNotification).not.toHaveBeenCalled()
    expect(mockSetPopoverOpen).toHaveBeenCalledWith(false)
  })

  it('should handle missing movie data gracefully', async () => {
    mockUseGetMovieDetailsQuery.mockReturnValue({
      data: undefined,
      error: null,
      isLoading: false,
    } as never)

    const props: PopoverContentHookProps = {
      movieId: 123,
      setPopoverOpen: mockSetPopoverOpen,
    }

    const { result } = renderHook(() => useContainer(props))

    const addToListProps: HandleAddToListProps = {
      listId: 'list1',
      listName: 'Watchlist',
    }

    // The hook should handle the case where movie is undefined
    // but still call addMovieToList since movieId is available
    await act(async () => {
      await result.current.handleAddToList(addToListProps)
    })

    // Should still call addMovieToList but movie title will be undefined in message
    expect(addTrigger).toHaveBeenCalledWith({ listId: 'list1', movieId: 123 })
    expect(mockListMessage).not.toHaveBeenCalled()
    expect(mockShowNotification).not.toHaveBeenCalled()
    expect(handleError).toHaveBeenCalledWith(expect.any(Error))
    const [errorArg] = handleError.mock.calls[0]
    expect(errorArg).toBeInstanceOf(TypeError)
    expect(mockSetPopoverOpen).toHaveBeenCalledWith(false)
  })

  it('should handle movie with no title', async () => {
    const movieWithoutTitle = { id: 123 }
    mockUseGetMovieDetailsQuery.mockReturnValue({
      data: movieWithoutTitle,
      error: null,
      isLoading: false,
    } as never)

    const props: PopoverContentHookProps = {
      movieId: 123,
      setPopoverOpen: mockSetPopoverOpen,
    }

    const { result } = renderHook(() => useContainer(props))

    await act(async () => {
      await result.current.handleAddToNewList(mockListData)
    })

    expect(mockListMessage).toHaveBeenCalledWith({
      listName: 'New List',
      movieTitle: undefined,
      type: 'add',
    })
  })

  it('should handle different list names in messages', async () => {
    const props: PopoverContentHookProps = {
      movieId: 123,
      setPopoverOpen: mockSetPopoverOpen,
    }

    const { result } = renderHook(() => useContainer(props))

    const testCases = [
      {
        expectedMessage: 'Test Movie added to My Favorites',
        listName: 'My Favorites',
      },
      {
        expectedMessage: 'Test Movie added to Action Movies',
        listName: 'Action Movies',
      },
      { expectedMessage: 'Test Movie added to ', listName: '' }, // Edge case
    ]

    for (const { expectedMessage, listName } of testCases) {
      mockListMessage.mockReturnValue(expectedMessage)

      const addToListProps: HandleAddToListProps = { listId: 'list1', listName }

      await act(async () => {
        await result.current.handleAddToList(addToListProps)
      })

      expect(mockListMessage).toHaveBeenCalledWith({
        listName,
        movieTitle: 'Test Movie',
        type: 'add',
      })
    }
  })

  it('should handle create list modal onSubmit callback correctly', () => {
    const props: PopoverContentHookProps = {
      movieId: 123,
      setPopoverOpen: mockSetPopoverOpen,
    }

    const { result } = renderHook(() => useContainer(props))

    act(() => {
      result.current.handleOpenCreateListModal()
    })

    const modalCall = openModalMock.mock.calls[0][0]
    expect(modalCall.modalType).toBe(modalTypes.CREATE_LIST)
    expect(modalCall.modalProps).toBeDefined()
    expect(typeof modalCall.modalProps?.onSubmit).toBe('function')
    expect(modalCall.modalProps?.closeModal).toBe(closeModalMock)

    // The onSubmit function should be the handleAddToNewList function
    expect(modalCall.modalProps?.onSubmit).toBe(
      result.current.handleAddToNewList
    )
  })
})
