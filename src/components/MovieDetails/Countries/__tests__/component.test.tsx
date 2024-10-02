import { renderWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import Countries from '../component'

describe('Countries component', () => {
  it('should match snapshot', () => {
    const { asFragment } = renderWithWrapper(
      <Countries
        countries={[{ iso_3166_1: 'US', name: 'United States of America' }]}
      />
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
