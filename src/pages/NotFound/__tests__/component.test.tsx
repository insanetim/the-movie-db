import renderWithWrapper from 'src/utils/testHelpers/renderWithWrapper'

import NotFound from '../component'

describe('NotFound component', () => {
  it('should match snapshot', () => {
    const { asFragment } = renderWithWrapper(<NotFound />)

    expect(asFragment()).toMatchSnapshot()
  })
})
