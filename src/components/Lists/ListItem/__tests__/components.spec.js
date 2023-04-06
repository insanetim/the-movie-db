import { render } from '@testing-library/react'

import Wrapper from 'src/__mocks__/wrapperMock'
import ListItem from '../component'

const mockedHookData = {
  handleClick: jest.fn(),
  handleDelete: jest.fn()
}
jest.mock('../hook', () => jest.fn(() => mockedHookData))

describe('ListItem component', () => {
  it('matches snapshot', () => {
    const mockedList = {
      id: 1,
      name: 'test/name',
      description: 'test/description'
    }
    const { asFragment } = render(<ListItem list={mockedList} />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })
})
