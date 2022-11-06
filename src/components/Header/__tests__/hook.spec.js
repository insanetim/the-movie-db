import { act, renderHook } from '@testing-library/react-hooks'

import { dispatch } from 'src/__mocks__/react-redux'
import { logOut } from 'src/state/session/actions'
import useContainer from '../hook'

jest.mock('src/state/session/selectors', () => ({
  accountSelector: jest.fn(() => ({ id: 1 }))
}))

jest.mock('src/state/session/actions')

describe('Header useContainer hook', () => {
  let result = null

  beforeEach(() => {
    ;({ result } = renderHook(useContainer))

    jest.clearAllMocks()
  })

  it('matches snapshot', () => {
    expect(result.current).toMatchSnapshot()
  })

  it('checks `handleLogout` method', () => {
    act(() => {
      result.current.handleLogout()
    })

    expect(dispatch).toHaveBeenCalledWith(logOut())
  })
})
