import { screen } from '@testing-library/react'
import { mockMovieCredit } from 'src/__mocks__/mockMovie'
import { renderWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import CreditsItem from '../../CreditsItem'
import CrewList from '../component'

jest.mock('../../CreditsItem', () =>
  jest.fn(() => <div data-testid='crew-item' />)
)

const mockedCreditsItem = CreditsItem as jest.Mock

describe('CrewList component', () => {
  beforeEach(() => {
    mockedCreditsItem.mockClear()
  })

  it('renders crew grouped by department with expected props', () => {
    renderWithWrapper(<CrewList crew={mockMovieCredit} />)

    expect(screen.getByRole('heading', { name: /Crew/ })).toBeInTheDocument()
    expect(screen.getAllByTestId('crew-item')).toHaveLength(
      mockMovieCredit.length
    )
    expect(mockedCreditsItem).toHaveBeenCalledWith(
      expect.objectContaining({
        description: mockMovieCredit[0].job,
        id: mockMovieCredit[0].id,
        profilePath: mockMovieCredit[0].profile_path,
        title: mockMovieCredit[0].name,
      }),
      expect.anything()
    )
  })

  it('renders department headings using hook grouping', () => {
    renderWithWrapper(<CrewList crew={mockMovieCredit} />)

    mockMovieCredit.forEach(member => {
      expect(screen.getByText(member.department!)).toBeInTheDocument()
    })
  })

  it('sorts department group headings alphabetically', () => {
    const mixedCrew = [
      { ...mockMovieCredit[0], department: 'Writing' },
      { ...mockMovieCredit[0], department: 'Art' },
      { ...mockMovieCredit[0], department: 'Directing' },
    ]

    renderWithWrapper(<CrewList crew={mixedCrew} />)

    const headings = screen
      .getAllByRole('heading', { level: 4 })
      .map(heading => heading.textContent?.trim())

    expect(headings).toEqual(['Art', 'Directing', 'Writing'])
  })
})
