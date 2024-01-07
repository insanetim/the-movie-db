import { RenderOptions, render } from '@testing-library/react'
import { ReactElement, ReactNode, Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'

type WrapperProps = {
  children: ReactNode
}

export const Wrapper = ({ children }: WrapperProps) => {
  return (
    <Suspense fallback={null}>
      <BrowserRouter>{children}</BrowserRouter>
    </Suspense>
  )
}

const renderWithWrapper = (
  ui: ReactElement,
  { ...renderOptions }: RenderOptions = {}
) => {
  return { ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}

export default renderWithWrapper
