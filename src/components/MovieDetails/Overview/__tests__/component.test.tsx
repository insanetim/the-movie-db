import { screen } from '@testing-library/react'
import { renderWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import Overview from '../component'

describe('Overview component', () => {
  it('renders overview heading and text', () => {
    renderWithWrapper(<Overview overview='test/overview' />)

    expect(
      screen.getByRole('heading', { name: 'Overview' })
    ).toBeInTheDocument()
    expect(screen.getByText('test/overview')).toBeInTheDocument()
  })
})
