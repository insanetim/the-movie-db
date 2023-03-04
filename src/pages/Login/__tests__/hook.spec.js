import { useNavigate } from 'react-router-dom'
import { act, renderHook } from '@testing-library/react-hooks'

import { dispatch } from 'src/__mocks__/react-redux'
import { logIn } from 'src/state/session/actions'
import useContainer from '../hook'

jest.mock('src/state/session/selectors', () => ({
  loadingSelector: jest.fn(() => false)
}))

jest.mock('src/state/session/actions')

dispatch.mockImplementationOnce(() => Promise.resolve())

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

  it('checks `handleLogIn` method', async () => {
    const userData = { username: 'user', password: 'password' }
    await act(async () => {
      await result.current.handleLogIn(userData)
    })

    expect(dispatch).toHaveBeenCalledWith(logIn(userData))
    expect(navigate).toHaveBeenCalledWith('/', { replace: true })
  })
})
