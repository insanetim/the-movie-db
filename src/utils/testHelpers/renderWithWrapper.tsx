import { render, renderHook, RenderOptions } from '@testing-library/react'
import { ReactElement, ReactNode, Suspense } from 'react'
import { Provider } from 'react-redux'
import { MemoryRouter as Router } from 'react-router-dom'
import { store } from 'src/store'

const Wrapper = ({ children }: { children: ReactNode }) => (
  <Provider store={store}>
    <Suspense fallback={null}>
      <Router>{children}</Router>
    </Suspense>
  </Provider>
)

export const renderWithWrapper = (ui: ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: Wrapper, ...options })

export const renderHookWithWrapper = <T,>(
  hook: () => T,
  options?: RenderOptions
) => renderHook(hook, { wrapper: Wrapper, ...options })
