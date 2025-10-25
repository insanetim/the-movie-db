import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import ThemeSwitch from '../component'
import { ThemeSwitchHookReturn } from '../types'

const mockedHook: ThemeSwitchHookReturn = {
  currentTheme: 'light',
  handleChange: jest.fn(),
}
jest.mock('../hook', () => jest.fn(() => mockedHook))

describe('ThemeSwitch component', () => {
  const user = userEvent.setup()

  it('renders theme options with current selection highlighted', () => {
    renderWithWrapper(<ThemeSwitch />)

    const radios = screen.getAllByRole('radio')

    expect(radios).toHaveLength(2)
    const selectedItem = radios[0].closest('.ant-segmented-item')
    const unselectedItem = radios[1].closest('.ant-segmented-item')

    expect(selectedItem).toHaveClass('ant-segmented-item-selected')
    expect(unselectedItem).not.toHaveClass('ant-segmented-item-selected')
  })

  it('should call "handleChange" when option clicked', async () => {
    renderWithWrapper(<ThemeSwitch />)

    // AntD Segmented renders options as radios where the input itself may be non-interactive.
    // Click the clickable container of the second option instead.
    const radios = screen.getAllByRole('radio')
    const clickable = (radios[1].closest('label') ||
      radios[1].parentElement) as HTMLElement
    await user.click(clickable)

    expect(mockedHook.handleChange).toHaveBeenCalledWith('dark')
  })
})
