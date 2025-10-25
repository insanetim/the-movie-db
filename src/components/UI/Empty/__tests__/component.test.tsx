import { screen } from '@testing-library/react'
import { renderWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import Empty from '../component'

describe('Empty component', () => {
  it('renders simple empty state with default description', () => {
    renderWithWrapper(<Empty />)

    expect(screen.getByText('No results')).toBeInTheDocument()
    expect(screen.getByTitle('No data')).toBeInTheDocument()
  })
})
