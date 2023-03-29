import { render } from '@testing-library/react'

import SearchInput from '../component'

const mockedHookData = {
  currentValue: 'test/searchQuery',
  handleChange: jest.fn(),
  handleSearch: jest.fn()
}
jest.mock('../hook', () => jest.fn(() => mockedHookData))

describe('SearchInput component', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<SearchInput />)

    expect(asFragment()).toMatchSnapshot()
  })
})
