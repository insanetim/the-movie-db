import { act, renderHook } from '@testing-library/react'
import { useNavigate } from 'react-router-dom'
import { dispatch } from 'src/__mocks__/react-redux'
import * as sessionActions from 'src/store/session/actions'

import useContainer from '../hook'

jest.mock('src/store/session/selectors', () => ({
  accountSelector: () => ({ id: 1234 }),
}))

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(() => ({})),
  useNavigate: jest.fn(),
}))
const navigate = jest.fn()
jest.mocked(useNavigate).mockReturnValue(navigate)

describe('Header useContainer hook', () => {
  it('should match snapshot', () => {
    const { result } = renderHook(useContainer)

    expect(result.current).toMatchSnapshot()
  })

  it('should check "handleLogOut" method', async () => {
    const logOut = jest.spyOn(sessionActions, 'logOut')
    const { result } = renderHook(useContainer)

    await act(() => {
      result.current.handleLogOut()
    })

    expect(dispatch).toHaveBeenCalled()
    expect(logOut).toHaveBeenCalled()
    expect(navigate).toHaveBeenCalledWith('/login', {
      replace: true,
      state: { from: {} },
    })
  })

  it('should check "useEffect" method', () => {
    const fetchAccount = jest.spyOn(sessionActions, 'fetchAccount')
    renderHook(useContainer)

    expect(dispatch).toHaveBeenCalled()
    expect(fetchAccount).toHaveBeenCalled()
  })
})
