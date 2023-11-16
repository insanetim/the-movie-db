import { render } from '@testing-library/react'

import LoginForm from '../component'

describe('LoginForm component', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(
      <LoginForm
        isSubmitting={false}
        onSubmit={jest.fn()}
      />
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
