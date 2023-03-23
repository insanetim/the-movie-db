import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { act, renderHook } from '@testing-library/react'

import { logOut } from 'src/store/session/actions'
import useContainer from '../hook'

jest.mock('src/store/session/selectors', () => ({
  accountSelector: jest.fn(() => ({ id: 1 }))
}))

jest.mock('src/store/session/actions')

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(fn => fn()),
  useDispatch: jest.fn()
}))
const dispatch = jest.fn()
useDispatch.mockReturnValue(dispatch)

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
