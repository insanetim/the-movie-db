import { render } from '@testing-library/react'

import EmptyLayout from '../component'

describe('EmptyLayout component', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<EmptyLayout />)

    expect(asFragment()).toMatchSnapshot()
  })
})
