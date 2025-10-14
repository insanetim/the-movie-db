import { renderWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import StoreProvider from '../component'

jest.mock('redux-persist/integration/react', () => ({
  PersistGate: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='persist-gate-mock'>{children}</div>
  ),
}))

describe('StoreProvider component', () => {
  it('should match snapshot', () => {
    const { asFragment } = renderWithWrapper(
      <StoreProvider>
        <div data-testid='child'>content</div>
      </StoreProvider>
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
