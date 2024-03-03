import renderWithWrapper from 'src/utils/testHelpers/renderWithWrapper'

import GoBackLink from '../component'

describe('GoBackLink component', () => {
  it('should match snapshot', () => {
    const { asFragment } = renderWithWrapper(
      <GoBackLink
        href='/movie/1234-test-movie'
        title='Back to movie details'
      />
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
