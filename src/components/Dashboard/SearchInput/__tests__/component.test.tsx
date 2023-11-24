import { fireEvent, render, screen } from '@testing-library/react'

import SearchInput from '../component'
import { SearchInputHook } from '../types'

const mockedHook: SearchInputHook = {
  handleChange: jest.fn(),
  handleSearch: jest.fn(),
  inputValue: ''
}
jest.mock('../hook', () => jest.fn(() => mockedHook))

describe('SearchInput component', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<SearchInput query={''} />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should call "handleChange" when input changed', () => {
    render(<SearchInput query={''} />)
    const input = screen.getByPlaceholderText('Enter movie name')
    fireEvent.change(input, { target: { value: 'test/search' } })

    expect(mockedHook.handleChange).toHaveBeenCalledTimes(1)
  })

  it('should call "handleSearch" when button clicked', () => {
    render(<SearchInput query={''} />)
    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(mockedHook.handleSearch).toHaveBeenCalledTimes(1)
  })
})
