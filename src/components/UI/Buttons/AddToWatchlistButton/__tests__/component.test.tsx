import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import AddToWatchlistButton from '../component'

describe('AddToWatchlistButton component', () => {
  const handleClick = jest.fn()

  it('should match snapshot', () => {
    const { asFragment } = render(
      <AddToWatchlistButton
        handleClick={handleClick}
        inWatchlist={true}
      />
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot with other data', () => {
    const { asFragment } = render(
      <AddToWatchlistButton
        handleClick={handleClick}
        inWatchlist={false}
      />
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should call "handleClick" when button clicked', async () => {
    render(
      <AddToWatchlistButton
        handleClick={handleClick}
        inWatchlist={true}
      />
    )

    const user = userEvent.setup()
    const button = screen.getByRole('button')
    await user.click(button)

    expect(handleClick).toHaveBeenCalled()
  })
})
