import { useNavigate } from 'react-router-dom'
import { act, renderHook } from '@testing-library/react'

import { dispatch } from 'src/__mocks__/react-redux'
import { logIn } from 'src/store/session/actions'
import useContainer from '../hook'

jest.mock('src/store/session/selectors', () => ({
  loadingSelector: jest.fn(() => false)
}))

jest.mock('src/store/session/actions')

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  useLocation: jest.fn().mockImplementation(() => ({}))
}))
const navigate = jest.fn()
useNavigate.mockReturnValue(navigate)

describe('Favotites useContainer hook', () => {
  let result = null

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
