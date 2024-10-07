import { act } from '@testing-library/react'
import { useSearchParams } from 'react-router-dom'
import mockAccount from 'src/__mocks__/mockAccount'
import { modalComponentsMap } from 'src/components/ModalRoot/modalComponents'
import { showModal } from 'src/store/app/actions'
import * as createdListsActions from 'src/store/createdLists/actions'
import * as reactRedux from 'src/store/hooks'
import { renderHookWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import useContainer from '../hook'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useSearchParams: jest.fn(),
}))
const searchParams = new URLSearchParams()
const setSearchParams = jest.fn()
jest.mocked(useSearchParams).mockReturnValue([searchParams, setSearchParams])

const mockDispatch = jest.fn()
jest.spyOn(reactRedux, 'useAppDispatch').mockReturnValue(mockDispatch)

describe('Lists useContainer hook', () => {
  const fetchLists = jest.spyOn(createdListsActions, 'fetchLists')

  it('should match snapshot', () => {
    const { result } = renderHookWithWrapper(useContainer)

    expect(result.current).toMatchSnapshot()
  })

  it('should check "handlePagination" method', () => {
    const { result } = renderHookWithWrapper(useContainer)

    act(() => {
      result.current.handlePagination(3)
    })

    expect(setSearchParams).toHaveBeenCalledWith({ page: '3' })
  })

  it('should check "handleCreateList" method', () => {
    let onSuccess = () => {}

    const { result } = renderHookWithWrapper(useContainer)

    act(() => {
      onSuccess = result.current.handleCreateList()
      onSuccess()
    })

    expect(mockDispatch).toHaveBeenCalledTimes(2)
    expect(mockDispatch).toHaveBeenNthCalledWith(
      1,
      showModal({
        modalProps: { onSuccess },
        modalType: modalComponentsMap.MODAL_CREATE_LIST,
      })
    )
    expect(fetchLists).toHaveBeenCalledWith('1')
  })

  it('should check "handleCreateList" method with page !== 1', () => {
    const searchParams = new URLSearchParams({ page: '3' })
    jest
      .mocked(useSearchParams)
      .mockReturnValueOnce([searchParams, setSearchParams])
    let onSuccess = () => {}

    const { result } = renderHookWithWrapper(useContainer)

    act(() => {
      onSuccess = result.current.handleCreateList()
      onSuccess()
    })

    expect(mockDispatch).toHaveBeenCalledTimes(1)
    expect(mockDispatch).toHaveBeenCalledWith(
      showModal({
        modalProps: { onSuccess },
        modalType: modalComponentsMap.MODAL_CREATE_LIST,
      })
    )
    expect(setSearchParams).toHaveBeenCalledWith({})
  })

  it('should check "useEffect" method with account', () => {
    const mockState = {
      auth: {
        _persist: {
          rehydrated: true,
          version: -1,
        },
        account: mockAccount,
        isAuthenticated: false,
      },
    }

    renderHookWithWrapper(useContainer, {
      preloadedState: mockState,
    })

    expect(mockDispatch).toHaveBeenCalled()
    expect(fetchLists).toHaveBeenCalledWith('1')
  })
})
