import { render } from '@testing-library/react'

import Pagination from '../component'

describe('Pagination component', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<Pagination />)

    expect(asFragment()).toMatchSnapshot()
  })
})
