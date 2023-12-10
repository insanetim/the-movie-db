import { PlusCircleOutlined } from '@ant-design/icons'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import IconButton from '../component'

describe('IconButton component', () => {
  const handleClick = jest.fn()

  it('should match snapshot', () => {
    const { asFragment } = render(
      <IconButton
        handleClick={handleClick}
        icon={<PlusCircleOutlined />}
      />
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should call "handleClick" when button clicked', async () => {
    render(
      <IconButton
        handleClick={handleClick}
        icon={<PlusCircleOutlined />}
      />
    )

    const user = userEvent.setup()
    const button = screen.getByRole('button')
    await user.click(button)

    expect(handleClick).toHaveBeenCalled()
  })
})
