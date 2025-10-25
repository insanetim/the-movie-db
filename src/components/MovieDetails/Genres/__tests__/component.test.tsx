import { screen } from '@testing-library/react'
import { renderWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import Genres from '../component'

describe('Genres component', () => {
  it('lists each genre name', () => {
    renderWithWrapper(<Genres genres={[{ id: 1, name: 'test/genre' }]} />)

    expect(screen.getByText('Genres:', { exact: false })).toBeInTheDocument()
    expect(screen.getByText('TEST/GENRE')).toBeInTheDocument()
  })

  it('renders comma-separated genre names', () => {
    renderWithWrapper(
      <Genres
        genres={[
          { id: 1, name: 'Action' },
          { id: 2, name: 'Adventure' },
        ]}
      />
    )

    const chips = screen.getAllByText(/ACTION|ADVENTURE/)

    expect(chips.map(chip => chip.textContent)).toEqual(['ACTION', 'ADVENTURE'])
  })
})
