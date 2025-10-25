import { screen } from '@testing-library/react'
import { renderWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import Error from '../component'

describe('Error component', () => {
  it('renders error result with provided message', () => {
    renderWithWrapper(<Error error='Something went wrong!' />)

    expect(screen.getByText('Something went wrong!')).toBeInTheDocument()
  })
})
