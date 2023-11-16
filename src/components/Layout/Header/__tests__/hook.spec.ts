import { act, renderHook } from '@testing-library/react'
import { useNavigate } from 'react-router-dom'
import { dispatch } from 'src/__mocks__/react-redux'
import { fetchAccount, logOut } from 'src/store/session/actions'

import useContainer from '../hook'

jest.mock('src/store/session/selectors', () => ({
  accountSelector: jest.fn(() => ({ id: 123 }))
}))

jest.mock('src/store/session/actions')

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn().mockImplementation(() => ({})),
  useNavigate: jest.fn()
}))
const navigate = jest.fn()
jest.mocked(useNavigate).mockReturnValue(navigate)

describe('Header useContainer hook', () => {
  it('matches snapshot', () => {
    const { result } = renderHook(useContainer)

    expect(result.current).toMatchSnapshot()
  })

  it('checks `handleLogOut` method', async () => {
    dispatch.mockImplementationOnce(() => Promise.resolve())
    const { result } = renderHook(useContainer)

    await act(async () => {
      await result.current.handleLogOut()
    })

    expect(dispatch).toHaveBeenCalledWith(logOut())
    expect(navigate).toHaveBeenCalledWith('/login', {
      replace: true,
      state: { from: {} }
    })
  })

  it('checks `useEffect` method', () => {
    renderHook(useContainer)

    expect(dispatch).toHaveBeenCalledTimes(1)
    expect(dispatch).toHaveBeenCalledWith(fetchAccount())
  })
})
