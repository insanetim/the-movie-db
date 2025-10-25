import { screen } from '@testing-library/react'
import { renderWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import Status from '../component'

describe('Status component', () => {
  it('renders status label and text', () => {
    renderWithWrapper(<Status status='Released' />)

    expect(screen.getByText('Status:')).toBeInTheDocument()
    expect(screen.getByText('Released')).toBeInTheDocument()
  })
})
