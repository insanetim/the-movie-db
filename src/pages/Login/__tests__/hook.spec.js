import { useNavigate } from 'react-router-dom'
import { act, renderHook } from '@testing-library/react-hooks'

import { dispatch } from 'src/__mocks__/react-redux'
import { logIn } from 'src/store/session/actions'
import useContainer from '../hook'

jest.mock('src/store/session/selectors', () => ({
  loadingSelector: jest.fn(() => false)
}))

jest.mock('src/store/session/actions')

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
    dispatch.mockImplementationOnce(() => Promise.resolve())
    const userData = { username: 'user', password: 'password' }

    await act(async () => {
      await result.current.handleLogIn(userData)
    })

    expect(dispatch).toHaveBeenCalledWith(logIn(userData))
    expect(navigate).toHaveBeenCalledWith('/', { replace: true })
  })
})
