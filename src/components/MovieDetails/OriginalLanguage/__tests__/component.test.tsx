import { screen } from '@testing-library/react'
import { renderWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import OriginalLanguage from '../component'

describe('OriginalLanguage component', () => {
  it('displays the original language label and value', () => {
    renderWithWrapper(<OriginalLanguage originalLanguage='en' />)

    expect(screen.getByText('Original Language:')).toBeInTheDocument()
    expect(screen.getByText('English')).toBeInTheDocument()
  })
})
