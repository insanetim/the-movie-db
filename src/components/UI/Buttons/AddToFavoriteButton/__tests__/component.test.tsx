import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import AddToFavoriteButton from '../component'

jest.mock('@ant-design/icons', () => ({
  __esModule: true,
  HeartFilled: () => <span data-testid='heart-filled' />,
  HeartOutlined: () => <span data-testid='heart-outlined' />,
}))

describe('AddToFavoriteButton component', () => {
  const user = userEvent.setup()
  const handleClick = jest.fn()

  it('renders filled heart icon when already in favorites', () => {
    renderWithWrapper(
      <AddToFavoriteButton
        inFavorite
        onClick={handleClick}
      />
    )

    expect(screen.getByTestId('heart-filled')).toBeInTheDocument()
    expect(screen.queryByTestId('heart-outlined')).not.toBeInTheDocument()
  })

  it('renders outlined heart icon when not in favorites', () => {
    renderWithWrapper(
      <AddToFavoriteButton
        inFavorite={false}
        onClick={handleClick}
      />
    )

    expect(screen.getByTestId('heart-outlined')).toBeInTheDocument()
    expect(screen.queryByTestId('heart-filled')).not.toBeInTheDocument()
  })

  it('should call "handleClick" when button clicked', async () => {
    renderWithWrapper(
      <AddToFavoriteButton
        inFavorite={true}
        onClick={handleClick}
      />
    )

    const button = screen.getByRole('button')
    await user.click(button)

    expect(handleClick).toHaveBeenCalled()
  })
})
