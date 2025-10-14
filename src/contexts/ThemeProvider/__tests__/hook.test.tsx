import { Theme } from 'src/store/app/types'
import { renderHookWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import useContainer from '../hook'

describe('ThemeProvider useContainer hook', () => {
  const mockState = {
    app: {
      _persist: {
        rehydrated: true,
        version: -1,
      },
      modal: {
        modalProps: null,
        modalType: null,
      },
      notifications: [],
      theme: 'light' as Theme,
    },
  }

  it('should match snapshot with light theme', () => {
    const { result } = renderHookWithWrapper(useContainer, {
      preloadedState: mockState,
    })

    expect(result.current).toMatchSnapshot()
  })

  it('should match snapshot with dark theme', () => {
    mockState.app.theme = 'dark' as Theme
    const { result } = renderHookWithWrapper(useContainer, {
      preloadedState: mockState,
    })

    expect(result.current).toMatchSnapshot()
  })
})
