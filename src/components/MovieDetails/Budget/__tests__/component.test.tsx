import { screen } from '@testing-library/react'
import { renderWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import Budget from '../component'

describe('Budget component', () => {
  it('renders formatted budget value', () => {
    renderWithWrapper(<Budget budget={1000000} />)

    expect(screen.getByText('Budget:')).toBeInTheDocument()
    expect(screen.getByText('$1,000,000')).toBeInTheDocument()
  })
})
