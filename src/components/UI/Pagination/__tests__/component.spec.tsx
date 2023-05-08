import { render } from '@testing-library/react'

import Pagination from '../component'

describe('Pagination component', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<Pagination />)

    expect(asFragment()).toMatchSnapshot()
  })
})
