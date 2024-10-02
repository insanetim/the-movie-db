import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import SearchInput from '../component'
import { SearchInputHookReturn } from '../types'

const mockedHook: SearchInputHookReturn = {
  handleChange: jest.fn(),
  handleSearch: jest.fn(),
  inputValue: '',
}
jest.mock('../hook', () => jest.fn(() => mockedHook))

describe('SearchInput component', () => {
  it('should match snapshot', () => {
    const { asFragment } = renderWithWrapper(<SearchInput query={''} />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should call "handleChange" when input changed', async () => {
    renderWithWrapper(<SearchInput query={''} />)

    const user = userEvent.setup()
    const input = screen.getByRole('textbox')
    await user.type(input, 'test/search')

    expect(mockedHook.handleChange).toHaveBeenCalled()
  })

  it('should call "handleSearch" when button clicked', async () => {
    renderWithWrapper(<SearchInput query={''} />)

    const user = userEvent.setup()
    const button = screen.getByRole('button')
    await user.click(button)

    expect(mockedHook.handleSearch).toHaveBeenCalled()
  })

  it('should call "handleSearch" when enter pressed', async () => {
    renderWithWrapper(<SearchInput query={''} />)

    const user = userEvent.setup()
    const input = screen.getByRole('textbox')
    await user.type(input, '{enter}')

    expect(mockedHook.handleSearch).toHaveBeenCalled()
  })
})
