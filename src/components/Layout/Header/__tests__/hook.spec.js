import { useNavigate } from 'react-router-dom'
import { act, renderHook } from '@testing-library/react'

import { dispatch } from 'src/__mocks__/react-redux'
import { logOut } from 'src/store/session/actions'
import useContainer from '../hook'

jest.mock('src/store/session/selectors', () => ({
  accountSelector: jest.fn(() => ({ id: 123 }))
}))

jest.mock('src/store/session/actions')

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  useLocation: jest.fn().mockImplementation(() => ({}))
}))
const navigate = jest.fn()
useNavigate.mockReturnValue(navigate)

describe('Header useContainer hook', () => {
  let result = null

  beforeEach(() => {
    ;({ result } = renderHook(useContainer))

    jest.clearAllMocks()
  })

  it('matches snapshot', () => {
    expect(result.current).toMatchSnapshot()
  })

  it('checks `handleLogOut` method', async () => {
    dispatch.mockImplementationOnce(() => Promise.resolve())

    await act(async () => {
      await result.current.handleLogOut()
    })

    expect(dispatch).toHaveBeenCalledWith(logOut())
    expect(navigate).toHaveBeenCalledWith('/login', { state: { from: {} } })
  })
})
