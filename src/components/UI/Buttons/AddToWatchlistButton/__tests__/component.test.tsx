import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import AddToWatchlistButton from '../component'

jest.mock('@ant-design/icons', () => ({
  __esModule: true,
  BookFilled: () => <span data-testid='book-filled' />,
  BookOutlined: () => <span data-testid='book-outlined' />,
}))

describe('AddToWatchlistButton component', () => {
  const user = userEvent.setup()
  const handleClick = jest.fn()

  it('renders filled book icon when item in watchlist', () => {
    renderWithWrapper(
      <AddToWatchlistButton
        inWatchlist
        onClick={handleClick}
      />
    )

    expect(screen.getByTestId('book-filled')).toBeInTheDocument()
    expect(screen.queryByTestId('book-outlined')).not.toBeInTheDocument()
  })

  it('renders outlined book icon when item not in watchlist', () => {
    renderWithWrapper(
      <AddToWatchlistButton
        inWatchlist={false}
        onClick={handleClick}
      />
    )

    expect(screen.getByTestId('book-outlined')).toBeInTheDocument()
    expect(screen.queryByTestId('book-filled')).not.toBeInTheDocument()
  })

  it('should call "handleClick" when button clicked', async () => {
    renderWithWrapper(
      <AddToWatchlistButton
        inWatchlist={true}
        onClick={handleClick}
      />
    )

    const button = screen.getByRole('button')
    await user.click(button)

    expect(handleClick).toHaveBeenCalled()
  })
})
