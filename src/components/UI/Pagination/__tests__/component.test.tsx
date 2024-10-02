import { renderWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import Pagination from '../component'

describe('Pagination component', () => {
  it('should match snapshot', () => {
    const { asFragment } = renderWithWrapper(<Pagination />)

    expect(asFragment()).toMatchSnapshot()
  })
})
