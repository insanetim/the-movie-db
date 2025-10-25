import { screen } from '@testing-library/react'
import { renderWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import NotFound from '../component'

describe('NotFound component', () => {
  it('should render heading, description, and home link', () => {
    renderWithWrapper(<NotFound />)

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: "Oops! We can't find the page you're looking for.",
      })
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        /Please check that the Web site address is spelled correctly/i
      )
    ).toBeInTheDocument()

    const homeLink = screen.getByRole('link', { name: 'home page' })
    expect(homeLink).toHaveAttribute('href', '/')
  })
})
