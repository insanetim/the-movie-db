import { renderHook } from '@testing-library/react'
import { dispatch } from 'src/__mocks__/react-redux'
import { fetchAccount } from 'src/store/session/actions'
import { sessionIdSelector } from 'src/store/session/selectors'

import useContainer from '../hook'

jest.mock('src/store/session/actions')

jest.mock('src/store/session/selectors', () => ({
  sessionIdSelector: jest.fn(() => 'test/sessionId')
}))

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn().mockImplementation(() => ({}))
}))

describe('ProtectedRoutes useContainer hook', () => {
  it('matches snapshot', () => {
    const { result } = renderHook(useContainer)

    expect(result.current).toMatchSnapshot()
  })

  it('checks `useEffect` method with sessionId', () => {
    renderHook(useContainer)

    expect(dispatch).toHaveBeenCalledTimes(1)
    expect(dispatch).toHaveBeenCalledWith(fetchAccount())
  })

  it('checks `useEffect` method without sessionId', () => {
    jest.mocked(sessionIdSelector).mockReturnValueOnce('')
    renderHook(useContainer)

    expect(dispatch).not.toHaveBeenCalled()
  })
})
