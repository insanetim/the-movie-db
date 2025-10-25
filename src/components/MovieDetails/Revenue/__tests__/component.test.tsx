import { screen } from '@testing-library/react'
import { renderWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import Revenue from '../component'

describe('Revenue component', () => {
  it('renders formatted revenue value', () => {
    renderWithWrapper(<Revenue revenue={3000000} />)

    expect(screen.getByText('Revenue:')).toBeInTheDocument()
    expect(screen.getByText('$3,000,000')).toBeInTheDocument()
  })
})
