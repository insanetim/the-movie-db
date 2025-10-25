import { render, screen } from '@testing-library/react'

import StoreProvider from '../component'

jest.mock('redux-persist/integration/react', () => ({
  PersistGate: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='persist-gate-mock'>{children}</div>
  ),
}))

describe('StoreProvider component', () => {
  it('should render children inside mocked PersistGate', () => {
    render(
      <StoreProvider>
        <div data-testid='child'>content</div>
      </StoreProvider>
    )

    expect(screen.getByTestId('persist-gate-mock')).toBeInTheDocument()
    expect(screen.getByTestId('child')).toHaveTextContent('content')
  })
})
