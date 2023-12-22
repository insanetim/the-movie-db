import { act, renderHook } from '@testing-library/react'
import { useSearchParams } from 'react-router-dom'
import mockAccount from 'src/__mocks__/mockAccount'
import { dispatch } from 'src/__mocks__/react-redux'
import { showModal } from 'src/store/app/actions'
import * as sessionSelectors from 'src/store/auth/selectors'
import * as listsActions from 'src/store/lists/actions'

import useContainer from '../hook'

jest.mock('src/store/lists/selectors', () => ({
  listsErrorSelector: () => null,
  listsLoadingSelector: () => true,
  listsSelector: () => null,
}))

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useSearchParams: jest.fn(),
}))
const searchParams = new URLSearchParams()
const setSearchParams = jest.fn()
jest.mocked(useSearchParams).mockReturnValue([searchParams, setSearchParams])

describe('Lists useContainer hook', () => {
  const fetchLists = jest.spyOn(listsActions, 'fetchLists')
  const accountSelector = jest
    .spyOn(sessionSelectors, 'accountSelector')
    .mockReturnValue(null)

  it('should match snapshot', () => {
    const { result } = renderHook(useContainer)

    expect(result.current).toMatchSnapshot()
  })

  it('should check "handlePagination" method', () => {
    const { result } = renderHook(useContainer)

    act(() => {
      result.current.handlePagination(3)
    })

    expect(setSearchParams).toHaveBeenCalledWith({ page: '3' })
  })

  it('should check "handleCreateList" method', () => {
    let onSuccess = () => {}
    const { result } = renderHook(useContainer)

    act(() => {
      onSuccess = result.current.handleCreateList()
      onSuccess()
    })

    expect(dispatch).toHaveBeenCalledTimes(2)
    expect(dispatch).toHaveBeenNthCalledWith(
      1,
      showModal({
        modalProps: { onSuccess },
        modalType: 'MODAL_CREATE_LIST',
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
    const { result } = renderHook(useContainer)

    act(() => {
      onSuccess = result.current.handleCreateList()
      onSuccess()
    })

    expect(dispatch).toHaveBeenCalledTimes(1)
    expect(dispatch).toHaveBeenCalledWith(
      showModal({
        modalProps: { onSuccess },
        modalType: 'MODAL_CREATE_LIST',
      })
    )
    expect(setSearchParams).toHaveBeenCalledWith({})
  })

  it('should check "useEffect" method with account', () => {
    accountSelector.mockReturnValueOnce(mockAccount)
    renderHook(useContainer)

    expect(dispatch).toHaveBeenCalled()
    expect(fetchLists).toHaveBeenCalledWith('1')
  })
})
