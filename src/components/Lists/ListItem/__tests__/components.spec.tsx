import { render } from '@testing-library/react'
import { mockList } from 'src/__mocks__/mockList'
import Wrapper from 'src/utils/testHelpers/wrapperMock'

import type { ListItemHook } from '../types'

import ListItem from '../component'

const mockedHookData: ListItemHook = {
  handleClick: jest.fn(),
  handleListDelete: jest.fn()
}
jest.mock('../hook', () => jest.fn(() => mockedHookData))

describe('ListItem component', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<ListItem list={mockList} />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })
})
