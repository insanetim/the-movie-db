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

const createWrapper =
  (store: AppStore) =>
  ({ children }: PropsWithChildren) => (
    <Provider store={store}>
      <Suspense fallback={null}>
        <BrowserRouter>{children}</BrowserRouter>
      </Suspense>
    </Provider>
  )

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

export const renderHookWithWrapper = <T,>(
  hook: () => T,
  {
    preloadedState = {} as RootState,
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) => {
  const Wrapper = createWrapper(store)
  return renderHook(hook, { wrapper: Wrapper, ...renderOptions })
}
