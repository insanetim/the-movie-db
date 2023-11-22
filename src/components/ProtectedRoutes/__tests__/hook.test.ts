import { renderHook } from '@testing-library/react'

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
  it('should match snapshot', () => {
    const { result } = renderHook(useContainer)

    expect(result.current).toMatchSnapshot()
  })
})
