import { render } from '@testing-library/react'

import Footer from '../component'

describe('Footer component', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<Footer />)

    expect(asFragment()).toMatchSnapshot()
  })
})
