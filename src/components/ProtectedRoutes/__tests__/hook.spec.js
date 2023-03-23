import { useDispatch } from 'react-redux'
import { renderHook } from '@testing-library/react'

import { fetchAccount } from 'src/store/session/actions'
import { sessionIdSelector } from 'src/store/session/selectors'
import useContainer from '../hook'

jest.mock('src/store/session/selectors', () => ({
  sessionIdSelector: jest.fn(() => 'test/sessionId')
}))

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(fn => fn()),
  useDispatch: jest.fn()
}))
const dispatch = jest.fn()
useDispatch.mockReturnValue(dispatch)

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn().mockImplementation(() => ({}))
}))

describe('ProtectedRoutes useContainer hook', () => {
  let result = null

  beforeEach(() => {
    ;({ result } = renderHook(useContainer))

    jest.clearAllMocks()
  })

  it('matches snapshot', () => {
    expect(result.current).toMatchSnapshot()
  })

  it('checks `useEffect` method with sessionId', () => {
    ;({ result } = renderHook(useContainer))

    expect(dispatch).toHaveBeenCalledTimes(1)
    expect(dispatch).toHaveBeenCalledWith(fetchAccount())
  })

  it('checks `useEffect` method with undefined sessionId', () => {
    sessionIdSelector.mockReturnValueOnce(null)
    ;({ result } = renderHook(useContainer))

    expect(dispatch).not.toHaveBeenCalled()
  })
})
