import { screen } from '@testing-library/react'
import { renderWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import EmptyLayout from '../component'

describe('EmptyLayout component', () => {
  it('should render child content inside layout containers', () => {
    renderWithWrapper(
      <EmptyLayout>
        <div data-testid='child'>content</div>
      </EmptyLayout>
    )

    expect(screen.getByTestId('child')).toHaveTextContent('content')
    expect(screen.getByTestId('child').closest('.auth-layout')).not.toBeNull()
  })
})
