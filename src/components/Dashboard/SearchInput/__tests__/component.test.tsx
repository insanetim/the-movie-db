import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import SearchInput from '../component'
import { SearchInputHook } from '../types'

const mockedHook: SearchInputHook = {
  handleChange: jest.fn(),
  handleSearch: jest.fn(),
  inputValue: '',
}
jest.mock('../hook', () => jest.fn(() => mockedHook))

describe('SearchInput component', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<SearchInput query={''} />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should call "handleChange" when input changed', async () => {
    render(<SearchInput query={''} />)

    const user = userEvent.setup()
    const input = screen.getByRole('textbox')
    await user.type(input, 'test/search')

    expect(mockedHook.handleChange).toHaveBeenCalled()
  })

  it('should call "handleSearch" when button clicked', async () => {
    render(<SearchInput query={''} />)

    const user = userEvent.setup()
    const button = screen.getByRole('button')
    await user.click(button)

    expect(mockedHook.handleSearch).toHaveBeenCalled()
  })

  it('should call "handleSearch" when enter pressed', async () => {
    render(<SearchInput query={''} />)

    const user = userEvent.setup()
    const input = screen.getByRole('textbox')
    await user.type(input, '{enter}')

    expect(mockedHook.handleSearch).toHaveBeenCalled()
  })
})
