import { render } from '@testing-library/react'

import ImdbRating from '../component'

describe('ImdbRating component', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<ImdbRating rating={9} />)

    expect(asFragment()).toMatchSnapshot()
  })
})
