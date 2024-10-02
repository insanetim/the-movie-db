import { renderWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import Footer from '../component'

describe('Footer component', () => {
  it('should match snapshot', () => {
    const { asFragment } = renderWithWrapper(<Footer />)

    expect(asFragment()).toMatchSnapshot()
  })
})
