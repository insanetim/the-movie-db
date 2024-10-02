import { renderWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import ContentRating from '../component'

describe('ContentRating component', () => {
  it('should match snapshot', () => {
    const { asFragment } = renderWithWrapper(
      <ContentRating contentRating='PG-13' />
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
