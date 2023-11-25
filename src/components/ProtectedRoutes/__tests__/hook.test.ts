import { renderHook } from '@testing-library/react'

import useContainer from '../hook'

jest.mock('src/store/session/selectors', () => ({
  sessionIdSelector: () => 'test/sessionId'
}))

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(() => ({}))
}))

describe('ProtectedRoutes useContainer hook', () => {
  it('should match snapshot', () => {
    const { result } = renderHook(useContainer)

    expect(result.current).toMatchSnapshot()
  })
})
