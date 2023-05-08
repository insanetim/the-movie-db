import { act, renderHook } from '@testing-library/react'

import mockAccount from 'src/__mocks__/mockAccount'
import { dispatch } from 'src/__mocks__/react-redux'
import { accountSelector } from 'src/store/session/selectors'
import { showModal } from 'src/store/app/actions'
import { fetchLists } from 'src/store/lists/actions'
import useContainer from '../hook'

jest.mock('src/store/lists/actions')

jest.mock('src/store/session/selectors', () => ({
  accountSelector: jest.fn(() => null)
}))

jest.mock('src/store/lists/selectors', () => ({
  listsSelector: jest.fn(() => null),
  listsLoadingSelector: jest.fn(() => true),
  listsErrorSelector: jest.fn(() => null)
}))

describe('Favotites useContainer hook', () => {
  it('matches snapshot', () => {
    const { result } = renderHook(useContainer)

    expect(result.current).toMatchSnapshot()
  })

  it('checks `handlePagination` method', () => {
    const { result } = renderHook(useContainer)

    act(() => {
      result.current.handlePagination(3)
    })

    expect(dispatch).toHaveBeenCalledWith(fetchLists(3))
  })

  it('checks `handleCreateList` method', () => {
    const { result } = renderHook(useContainer)

    act(() => {
      result.current.handleCreateList()
    })

    expect(dispatch).toHaveBeenCalledWith(
      showModal({
        modalType: 'MODAL_CREATE_LIST'
      })
    )
  })

  it('checks `useEffect` method with account', () => {
    jest.mocked(accountSelector).mockReturnValueOnce(mockAccount)
    renderHook(useContainer)

    expect(dispatch).toHaveBeenCalledWith(fetchLists(1))
  })
})