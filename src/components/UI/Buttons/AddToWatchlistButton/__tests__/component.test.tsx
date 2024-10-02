import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import AddToWatchlistButton from '../component'

describe('AddToWatchlistButton component', () => {
  const handleClick = jest.fn()

  it('should match snapshot', () => {
    const { asFragment } = renderWithWrapper(
      <AddToWatchlistButton
        inWatchlist={true}
        onClick={handleClick}
      />
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot with other data', () => {
    const { asFragment } = renderWithWrapper(
      <AddToWatchlistButton
        inWatchlist={false}
        onClick={handleClick}
      />
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should call "handleClick" when button clicked', async () => {
    renderWithWrapper(
      <AddToWatchlistButton
        inWatchlist={true}
        onClick={handleClick}
      />
    )

    const user = userEvent.setup()
    const button = screen.getByRole('button')
    await user.click(button)

    expect(handleClick).toHaveBeenCalled()
  })
})
