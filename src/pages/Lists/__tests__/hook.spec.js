import { act, renderHook } from '@testing-library/react'

import { dispatch } from 'src/__mocks__/react-redux'
import { accountSelector } from 'src/store/session/selectors'
import { showModal } from 'src/store/app/actions'
import { fetchLists } from 'src/store/lists/actions'
import useContainer from '../hook'

jest.mock('src/store/session/selectors', () => ({
  accountSelector: jest.fn(() => ({}))
}))

jest.mock('src/store/lists/selectors', () => ({
  listsSelector: jest.fn(() => ({})),
  listsPageSelector: jest.fn(() => 1),
  listsLoadingSelector: jest.fn(() => true),
  listsErrorSelector: jest.fn(() => null)
}))

describe('Favotites useContainer hook', () => {
  let result = null

  beforeEach(() => {
    ;({ result } = renderHook(useContainer))

    jest.clearAllMocks()
  })

  it('matches snapshot', () => {
    expect(result.current).toMatchSnapshot()
  })

  it('checks `handleClick` method', () => {
    act(() => {
      result.current.handleClick()
    })

    expect(dispatch).toHaveBeenCalledWith(
      showModal({
        modalType: 'CREATE_LIST_MODAL'
      })
    )
  })

  it('checks `useEffect` method with account', () => {
    accountSelector.mockReturnValueOnce({ id: 123 })
    ;({ result } = renderHook(useContainer))

    expect(dispatch).toHaveBeenCalledWith(fetchLists(1))
  })
})
