import { screen } from '@testing-library/react'
import { renderWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import PersonalInfo from '../component'

jest.useFakeTimers().setSystemTime(new Date('2020-01-01'))

describe('PersonalInfo component', () => {
  it('renders personal info for a living person', () => {
    renderWithWrapper(
      <PersonalInfo
        birthday='1969-01-01'
        gender={3}
        placeOfBirth='New York, USA'
      />
    )

    expect(
      screen.getByRole('heading', { name: 'Personal Info' })
    ).toBeInTheDocument()
    expect(screen.getByText('Non-binary')).toBeInTheDocument()
    expect(
      screen.getByText('January 1, 1969 (50 years old)')
    ).toBeInTheDocument()
    expect(screen.queryByText(/Deathday:/)).not.toBeInTheDocument()
    expect(screen.getByText('New York, USA')).toBeInTheDocument()
  })

  it('renders additional details when deathday is provided', () => {
    renderWithWrapper(
      <PersonalInfo
        birthday='1969-01-01'
        deathday='2010-01-01'
        gender={3}
        placeOfBirth='New York, USA'
      />
    )

    expect(screen.getByText('January 1, 1969')).toBeInTheDocument()
    expect(
      screen.getByText('January 1, 2010 (40 years old)')
    ).toBeInTheDocument()
  })
})
