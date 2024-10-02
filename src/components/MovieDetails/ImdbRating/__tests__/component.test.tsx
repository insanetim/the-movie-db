import { renderWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import ImdbRating from '../component'

describe('ImdbRating component', () => {
  it('should match snapshot', () => {
    const { asFragment } = renderWithWrapper(<ImdbRating rating={9} />)

    expect(asFragment()).toMatchSnapshot()
  })
})
