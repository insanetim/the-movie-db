import type { MappingAlgorithm } from 'antd'
import type { ReactNode } from 'react'

import { screen } from '@testing-library/react'
import { renderWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

type ConfigProviderProps = {
  children: ReactNode
  theme?: ConfigTheme
}

type ConfigTheme = {
  algorithm?: MappingAlgorithm
  components?: {
    Layout?: LayoutTheme
  }
}

type LayoutTheme = {
  bodyBg?: string
  footerBg?: string
  headerBg?: string
}

const configProviderCalls: ConfigProviderProps[] = []

jest.mock('antd', () => ({
  ...jest.requireActual('antd'),
  ConfigProvider: ({ children, ...props }: ConfigProviderProps) => {
    configProviderCalls.push({ children, ...props })
    return <div data-testid='config-provider'>{children}</div>
  },
}))

import ThemeProvider from '../component'
import { ThemeProviderHookReturn } from '../types'

const algorithmMock = jest.fn() as unknown as MappingAlgorithm
const mockedHook: ThemeProviderHookReturn = {
  algorithm: algorithmMock,
  isDark: false,
}
jest.mock('../hook', () => jest.fn(() => mockedHook))

describe('ThemeProvider component', () => {
  beforeEach(() => {
    configProviderCalls.length = 0
    mockedHook.isDark = false
  })

  it('should configure theme with light mode values', () => {
    renderWithWrapper(
      <ThemeProvider>
        <div data-testid='child'>content</div>
      </ThemeProvider>
    )

    expect(screen.getByTestId('child')).toHaveTextContent('content')
    expect(configProviderCalls).toHaveLength(1)

    const { theme } = configProviderCalls[0]
    expect(theme?.algorithm).toBe(mockedHook.algorithm)
    expect(theme?.components?.Layout).toMatchObject({
      bodyBg: '#fff',
      footerBg: '#f5f5f5',
      headerBg: '#032541',
    })
  })

  it('should configure theme with dark mode values', () => {
    mockedHook.isDark = true

    renderWithWrapper(
      <ThemeProvider>
        <div data-testid='child'>content</div>
      </ThemeProvider>
    )

    expect(configProviderCalls).toHaveLength(1)

    const { theme } = configProviderCalls[0]
    expect(theme?.components?.Layout).toMatchObject({
      bodyBg: '#121212',
      footerBg: '#121212',
    })
  })
})
