import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import AddToFavoriteButton from '../component'

describe('AddToFavoriteButton component', () => {
  const handleClick = jest.fn()

  it('should match snapshot', () => {
    const { asFragment } = render(
      <AddToFavoriteButton
        handleClick={handleClick}
        inFavorite={true}
      />
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot with other data', () => {
    const { asFragment } = render(
      <AddToFavoriteButton
        handleClick={handleClick}
        inFavorite={false}
      />
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should call "handleClick" when button clicked', async () => {
    render(
      <AddToFavoriteButton
        handleClick={handleClick}
        inFavorite={true}
      />
    )

    const user = userEvent.setup()
    const button = screen.getByRole('button')
    await user.click(button)

    expect(handleClick).toHaveBeenCalled()
  })
})
