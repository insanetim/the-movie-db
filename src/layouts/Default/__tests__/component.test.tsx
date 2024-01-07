import { render } from '@testing-library/react'
import mockAccount from 'src/__mocks__/mockAccount'

import DefaultLayout from '../component'

const mockedHeader = { account: mockAccount }
jest.mock('../Header/hook', () => jest.fn(() => mockedHeader))

describe('DefaultLayout component', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<DefaultLayout />)

    expect(asFragment()).toMatchSnapshot()
  })
})
