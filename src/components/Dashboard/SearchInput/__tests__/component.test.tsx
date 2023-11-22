import { render } from '@testing-library/react'

import SearchInput from '../component'
import { SearchInputHook } from '../types'

const mockedHookData: SearchInputHook = {
  handleChange: jest.fn(),
  handleSearch: jest.fn(),
  inputValue: ''
}
jest.mock('../hook', () => jest.fn(() => mockedHookData))

describe('SearchInput component', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<SearchInput query={''} />)

    expect(asFragment()).toMatchSnapshot()
  })
})
