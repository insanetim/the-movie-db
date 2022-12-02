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

  it('checks `handleLogOut` method', () => {
    let callback
    act(() => {
      callback = result.current.handleLogOut()
    })
    callback()

    expect(dispatch).toHaveBeenCalledWith(logOut())
    expect(navigate).toHaveBeenCalledWith('/login', { state: { from: {} } })
  })
})
