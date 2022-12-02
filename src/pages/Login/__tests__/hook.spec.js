import { useNavigate } from 'react-router-dom'
import { act, renderHook } from '@testing-library/react-hooks'

import { dispatch } from 'src/__mocks__/react-redux'
import { logIn } from 'src/state/session/actions'
import useContainer from '../hook'

jest.mock('src/state/app/selectors', () => ({
  loadingSelector: jest.fn(() => false)
}))

describe('Favotites useContainer hook', () => {
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

  it('checks `handleLogIn` method', () => {
    let callback
    const data = { username: 'user', password: 'password' }
    act(() => {
      callback = result.current.handleLogIn(data)
    })
    callback()

    expect(dispatch).toHaveBeenCalledWith(logIn(data, callback))
    expect(navigate).toHaveBeenCalledWith('/', { replace: true })
  })
})
