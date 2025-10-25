import { screen } from '@testing-library/react'
import { renderWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import Countries from '../component'

describe('Countries component', () => {
  it('lists provided production countries', () => {
    renderWithWrapper(
      <Countries
        countries={[{ iso_3166_1: 'US', name: 'United States of America' }]}
      />
    )

    expect(screen.getByText(/Country/)).toBeInTheDocument()
    expect(screen.getByText('United States of America')).toBeInTheDocument()
  })

  it('pluralizes label and joins multiple country names', () => {
    renderWithWrapper(
      <Countries
        countries={[
          { iso_3166_1: 'CA', name: 'Canada' },
          { iso_3166_1: 'US', name: 'United States of America' },
        ]}
      />
    )

    expect(screen.getByText(/Countries/)).toBeInTheDocument()
    expect(
      screen.getByText('Canada, United States of America')
    ).toBeInTheDocument()
  })
})
