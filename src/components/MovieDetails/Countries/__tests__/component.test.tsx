import { render } from '@testing-library/react'

import Countries from '../component'

describe('Countries component', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(
      <Countries
        countries={[{ iso_3166_1: 'US', name: 'United States of America' }]}
      />
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
