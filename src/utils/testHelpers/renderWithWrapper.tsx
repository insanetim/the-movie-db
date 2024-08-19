import { render, RenderOptions } from '@testing-library/react'
import { ReactElement, ReactNode, Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'

type WrapperProps = {
  children: ReactNode
}

export const WrapperComponent = ({ children: component }: WrapperProps) => (
  <Suspense fallback={null}>
    <BrowserRouter>{component}</BrowserRouter>
  </Suspense>
)

const renderWithWrapper = (ui: ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: WrapperComponent, ...options })

export default renderWithWrapper
