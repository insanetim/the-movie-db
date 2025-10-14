import { renderWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import ThemeProvider from '../component'
import { ThemeProviderHookReturn } from '../types'

const mockedHook: ThemeProviderHookReturn = {
  algorithm: jest.fn(),
  isDark: false,
}
jest.mock('../hook', () => jest.fn(() => mockedHook))

describe('ThemeProvider component', () => {
  it('should match snapshot', () => {
    const { asFragment } = renderWithWrapper(
      <ThemeProvider>
        <div data-testid='child'>content</div>
      </ThemeProvider>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot when isDark is true', () => {
    mockedHook.isDark = true

    const { asFragment } = renderWithWrapper(
      <ThemeProvider>
        <div data-testid='child'>content</div>
      </ThemeProvider>
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
