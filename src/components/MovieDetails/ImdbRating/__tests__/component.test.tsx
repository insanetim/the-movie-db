import { screen } from '@testing-library/react'
import { renderWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import ImdbRating from '../component'

describe('ImdbRating component', () => {
  it('renders IMDb logo and rating value', () => {
    renderWithWrapper(<ImdbRating rating={9} />)

    const logo = screen.getByAltText('imdb') as HTMLImageElement

    expect(logo).toBeInTheDocument()
    expect(logo.title).toBe('imdb rating')
    expect(screen.getByText('9')).toBeInTheDocument()
  })
})
