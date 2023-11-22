import { act, renderHook } from '@testing-library/react'
import { useSearchParams } from 'react-router-dom'
import mockAccount from 'src/__mocks__/mockAccount'
import { dispatch } from 'src/__mocks__/react-redux'
import { showModal } from 'src/store/app/actions'
import { fetchLists } from 'src/store/lists/actions'
import { accountSelector } from 'src/store/session/selectors'

import useContainer from '../hook'

jest.mock('src/store/lists/actions')

jest.mock('src/store/session/selectors', () => ({
  accountSelector: jest.fn(() => null)
}))

jest.mock('src/store/lists/selectors', () => ({
  listsErrorSelector: jest.fn(() => null),
  listsLoadingSelector: jest.fn(() => true),
  listsSelector: jest.fn(() => null)
}))

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useSearchParams: jest.fn()
}))
const searchParams = new URLSearchParams()
const setSearchParams = jest.fn()
jest.mocked(useSearchParams).mockReturnValue([searchParams, setSearchParams])

describe('Lists useContainer hook', () => {
  it('should match snapshot', () => {
    const { result } = renderHook(useContainer)

    expect(result.current).toMatchSnapshot()
  })

  it('should check `handlePagination` method', () => {
    const { result } = renderHook(useContainer)

    act(() => {
      result.current.handlePagination(3)
    })

    expect(setSearchParams).toHaveBeenCalledWith({ page: '3' })
  })

  it('should check `handleCreateList` method', () => {
    let onSuccess = () => {
      return
    }
    const { result } = renderHook(useContainer)

    act(() => {
      onSuccess = result.current.handleCreateList()
    })
    onSuccess()

    expect(dispatch).toHaveBeenCalledWith(
      showModal({
        modalProps: { onSuccess },
        modalType: 'MODAL_CREATE_LIST'
      })
    )
    expect(dispatch).toHaveBeenCalledWith(fetchLists('1'))
  })

  it('should check `handleCreateList` method with page !== 1', () => {
    const searchParams = new URLSearchParams({ page: '3' })
    jest
      .mocked(useSearchParams)
      .mockReturnValue([searchParams, setSearchParams])
    let onSuccess = () => {
      return
    }
    const { result } = renderHook(useContainer)

    act(() => {
      onSuccess = result.current.handleCreateList()
    })
    onSuccess()

    expect(dispatch).toHaveBeenCalledWith(
      showModal({
        modalProps: { onSuccess },
        modalType: 'MODAL_CREATE_LIST'
      })
    )
    expect(setSearchParams).toHaveBeenCalledWith({})
  })

  it('should check `useEffect` method with account', () => {
    jest.mocked(accountSelector).mockReturnValueOnce(mockAccount)
    renderHook(useContainer)

    expect(dispatch).toHaveBeenCalledWith(fetchLists('1'))
  })
})
