import { screen } from '@testing-library/react'
import { renderWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import Runtime from '../component'

describe('Runtime component', () => {
  it('renders runtime duration in hours and minutes', () => {
    renderWithWrapper(<Runtime runtime={150} />)

    expect(screen.getByText('Runtime:')).toBeInTheDocument()
    expect(screen.getByText('2h 30m')).toBeInTheDocument()
  })
})
