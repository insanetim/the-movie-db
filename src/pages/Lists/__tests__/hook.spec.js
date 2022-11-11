import { act, renderHook } from '@testing-library/react-hooks'

import { dispatch } from 'src/__mocks__/react-redux'
import { accountSelector } from 'src/state/session/selectors'
import { showModal } from 'src/state/app/actions'
import { fetchLists } from 'src/state/lists/actions'
import useContainer from '../hook'

jest.mock('src/state/session/selectors', () => ({
  accountSelector: jest.fn(() => ({}))
}))

jest.mock('src/state/lists/selectors', () => ({
  listsSelector: jest.fn(() => ({}))
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
    accountSelector.mockReturnValueOnce({ id: 1 })
    ;({ result } = renderHook(useContainer))

    expect(dispatch).toHaveBeenCalledWith(fetchLists())
  })
})
