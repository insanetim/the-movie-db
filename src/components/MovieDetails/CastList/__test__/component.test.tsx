import { screen } from '@testing-library/react'
import { mockMovieCredit } from 'src/__mocks__/mockMovie'
import { renderWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import CreditsItem from '../../CreditsItem'
import CastList from '../component'

jest.mock('../../CreditsItem', () =>
  jest.fn(() => <div data-testid='cast-item' />)
)

const mockedCreditsItem = CreditsItem as jest.Mock

describe('CastList component', () => {
  beforeEach(() => {
    mockedCreditsItem.mockClear()
  })

  it('renders cast items with expected props', () => {
    renderWithWrapper(<CastList cast={mockMovieCredit} />)

    expect(screen.getByRole('heading', { name: 'Cast' })).toBeInTheDocument()
    expect(screen.getAllByTestId('cast-item')).toHaveLength(
      mockMovieCredit.length
    )
    expect(mockedCreditsItem).toHaveBeenCalledWith(
      expect.objectContaining({
        description: mockMovieCredit[0].character,
        id: mockMovieCredit[0].id,
        profilePath: mockMovieCredit[0].profile_path,
        title: mockMovieCredit[0].name,
      }),
      expect.anything()
    )
  })

  it('shows total count when requested', () => {
    renderWithWrapper(
      <CastList
        cast={mockMovieCredit}
        showTotal
      />
    )

    expect(document.querySelector('.total-count')).toHaveTextContent(
      `(${mockMovieCredit.length})`
    )
  })
})
