import { render, renderHook, RenderOptions } from '@testing-library/react'
import { PropsWithChildren, ReactNode, Suspense } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import mockState from 'src/__mocks__/mockState'
import { AppStore, RootState, setupStore } from 'src/store'

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>
  store?: AppStore
}

/**
 * Creates a wrapper component that provides Redux store, Router, and Suspense context
 * @param store - The Redux store to provide to components
 * @returns A wrapper component for testing
 */
const createWrapper =
  (store: AppStore) =>
  ({ children }: PropsWithChildren) => (
    <Provider store={store}>
      <Suspense fallback={null}>
        <BrowserRouter>{children}</BrowserRouter>
      </Suspense>
    </Provider>
  )

/**
 * Renders a React component with Redux store, Router, and Suspense providers
 * @param ui - The React component to render
 * @param options - Extended render options including preloaded state and custom store
 * @returns The render result from React Testing Library
 */
export const renderWithWrapper = (
  ui: ReactNode,
  {
    preloadedState = mockState,
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) => {
  const Wrapper = createWrapper(store)
  return render(ui, { wrapper: Wrapper, ...renderOptions })
}

/**
 * Renders a React hook with Redux store, Router, and Suspense providers
 * @param hook - The hook function to render
 * @param options - Extended render options including preloaded state and custom store
 * @returns The renderHook result from React Testing Library
 */
export const renderHookWithWrapper = <TProps, TResult>(
  hook: (initialProps?: TProps) => TResult,
  {
    preloadedState = mockState,
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) => {
  const Wrapper = createWrapper(store)
  return renderHook(hook, { wrapper: Wrapper, ...renderOptions })
}
