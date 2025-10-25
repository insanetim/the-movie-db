import { screen } from '@testing-library/react'
import { renderWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import Footer from '../component'

describe('Footer component', () => {
  it('should render attribution link with correct target', () => {
    renderWithWrapper(<Footer />)

    const link = screen.getByRole('link', { name: /insanetim/i })
    expect(link).toHaveAttribute(
      'href',
      'https://github.com/insanetim/the-movie-db'
    )
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noreferrer')
    expect(screen.getByText(/made with/i)).toBeInTheDocument()
  })
})
