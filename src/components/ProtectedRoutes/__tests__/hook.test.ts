import { renderHookWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import useContainer from '../hook'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(() => ({})),
}))

describe('ProtectedRoutes useContainer hook', () => {
  const mockState = {
    auth: {
      _persist: {
        rehydrated: true,
        version: -1,
      },
      account: null,
      isAuthenticated: true,
    },
  }

  it('should match snapshot', () => {
    const { result } = renderHookWithWrapper(useContainer, {
      preloadedState: mockState,
    })

    expect(result.current).toMatchSnapshot()
  })
})
