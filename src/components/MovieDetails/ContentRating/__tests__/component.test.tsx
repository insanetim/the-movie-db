import { screen } from '@testing-library/react'
import { renderWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import ContentRating from '../component'

describe('ContentRating component', () => {
  it('displays provided content rating text', () => {
    renderWithWrapper(<ContentRating contentRating='PG-13' />)

    expect(screen.getByText(/Rating/i)).toBeInTheDocument()
    expect(screen.getByText('PG-13')).toBeInTheDocument()
  })
})
