import { PlusCircleOutlined } from '@ant-design/icons'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import IconButton from '../component'

describe('IconButton component', () => {
  const user = userEvent.setup()
  const handleClick = jest.fn()

  it('renders provided icon inside button', () => {
    renderWithWrapper(
      <IconButton
        icon={<PlusCircleOutlined />}
        onClick={handleClick}
      />
    )

    expect(screen.getByRole('img', { name: 'plus-circle' })).toBeInTheDocument()
    expect(screen.getByRole('button')).toContainElement(
      screen.getByRole('img', { name: 'plus-circle' })
    )
  })

  it('should call "handleClick" when button clicked', async () => {
    renderWithWrapper(
      <IconButton
        icon={<PlusCircleOutlined />}
        onClick={handleClick}
      />
    )

    const button = screen.getByRole('button')
    await user.click(button)

    expect(handleClick).toHaveBeenCalled()
  })
})
