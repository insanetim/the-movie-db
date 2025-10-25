import { screen } from '@testing-library/react'
import { renderWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import GoBackLink from '../component'

describe('GoBackLink component', () => {
  it('renders link with icon and title', () => {
    renderWithWrapper(
      <GoBackLink
        href='/movie/1234-test-movie'
        title='Back to movie details'
      />
    )

    const link = screen.getByRole('link', { name: /Back to movie details/i })

    expect(link).toHaveAttribute('href', '/movie/1234-test-movie')
    expect(screen.getByRole('img', { name: 'arrow-left' })).toBeInTheDocument()
  })
})
