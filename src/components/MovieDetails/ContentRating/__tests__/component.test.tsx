import { render } from '@testing-library/react'

import ContentRating from '../component'

describe('ContentRating component', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<ContentRating contentRating='PG-13' />)

    expect(asFragment()).toMatchSnapshot()
  })
})
