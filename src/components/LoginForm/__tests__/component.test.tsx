import { renderWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import LoginForm from '../component'

describe('LoginForm component', () => {
  it('should match snapshot', () => {
    const { asFragment } = renderWithWrapper(
      <LoginForm
        isSubmitting={false}
        onSubmit={jest.fn()}
      />
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
