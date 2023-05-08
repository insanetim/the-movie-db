import { render } from '@testing-library/react'

import type { SearchInputHook } from '../types'
import SearchInput from '../component'

const mockedHookData: SearchInputHook = {
  currentValue: '',
  handleChange: jest.fn(),
  handleSearch: jest.fn()
}
jest.mock('../hook', () => jest.fn(() => mockedHookData))

describe('SearchInput component', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<SearchInput query={''} />)

    expect(asFragment()).toMatchSnapshot()
  })
})
