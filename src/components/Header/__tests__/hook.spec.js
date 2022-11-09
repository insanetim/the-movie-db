import { useNavigate } from 'react-router-dom'
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

  const navigate = jest.fn()
  useNavigate.mockReturnValue(navigate)

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

  it('checks `cb` method', () => {
    act(() => {
      result.current.cb()
    })

    expect(navigate).toHaveBeenCalledWith('/login', { state: { from: {} } })
  })
})
