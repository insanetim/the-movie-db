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
  const user = userEvent.setup()

  beforeEach(() => {
    jest.clearAllMocks()
    mockedHook.inputValue = ''
  })

  it('should render search input with placeholder and button', () => {
    renderWithWrapper(<SearchInput query={''} />)

    expect(screen.getByPlaceholderText('Enter movie name')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument()
  })

  it('should render current input value from hook', () => {
    mockedHook.inputValue = 'my search query'

    renderWithWrapper(<SearchInput query={''} />)

    expect(screen.getByPlaceholderText('Enter movie name')).toHaveValue(
      'my search query'
    )
  })

  it('should call "handleChange" when input changed', async () => {
    renderWithWrapper(<SearchInput query={''} />)

    const input = screen.getByPlaceholderText('Enter movie name')
    await user.type(input, 'test/search')

    expect(mockedHook.handleChange).toHaveBeenCalled()
  })

  it('should call "handleSearch" when button clicked', async () => {
    renderWithWrapper(<SearchInput query={''} />)

    const button = screen.getByRole('button', { name: /search/i })
    await user.click(button)

    expect(mockedHook.handleSearch).toHaveBeenCalled()
  })

  it('should call "handleSearch" when enter pressed', async () => {
    renderWithWrapper(<SearchInput query={''} />)

    const input = screen.getByPlaceholderText('Enter movie name')
    await user.type(input, '{Enter}')

    expect(mockedHook.handleSearch).toHaveBeenCalled()
  })
})
