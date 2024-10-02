import { renderWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import EmptyLayout from '../component'

describe('EmptyLayout component', () => {
  it('should match snapshot', () => {
    const { asFragment } = renderWithWrapper(<EmptyLayout />)

    expect(asFragment()).toMatchSnapshot()
  })
})
