import { renderWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'
jest.mock('../hook', () => ({
  __esModule: true,
  default: jest.fn(),
}))

import LoginForm from '../component'
import useContainer from '../hook'

describe('LoginForm component', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should match snapshot when isDark=false (light mode)', () => {
    ;(useContainer as unknown as jest.Mock).mockReturnValue({ isDark: false })

    const { asFragment } = renderWithWrapper(
      <LoginForm
        isSubmitting={false}
        onSubmit={jest.fn()}
      />
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot when isDark=true (dark mode)', () => {
    ;(useContainer as unknown as jest.Mock).mockReturnValue({ isDark: true })

    const { asFragment } = renderWithWrapper(
      <LoginForm
        isSubmitting={false}
        onSubmit={jest.fn()}
      />
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
