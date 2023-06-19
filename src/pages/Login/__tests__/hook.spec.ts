import { act, renderHook } from '@testing-library/react'
import { useNavigate } from 'react-router-dom'
import { dispatch } from 'src/__mocks__/react-redux'
import { logIn } from 'src/store/session/actions'

import useContainer from '../hook'

jest.mock('src/store/session/actions')

jest.mock('src/store/session/selectors', () => ({
  loadingSelector: jest.fn(() => false)
}))

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn().mockImplementation(() => ({})),
  useNavigate: jest.fn()
}))
const navigate = jest.fn()
jest.mocked(useNavigate).mockReturnValue(navigate)

describe('Favotites useContainer hook', () => {
  it('matches snapshot', () => {
    const { result } = renderHook(useContainer)

    expect(result.current).toMatchSnapshot()
  })

  it('checks `handleLogIn` method', async () => {
    dispatch.mockImplementationOnce(() => Promise.resolve())
    const userData = { password: 'password', username: 'user' }
    const { result } = renderHook(useContainer)

    await act(async () => {
      await result.current.handleLogIn(userData)
    })

    expect(dispatch).toHaveBeenCalledWith(logIn(userData))
    expect(navigate).toHaveBeenCalledWith('/', { replace: true })
  })
})
