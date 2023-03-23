import { render } from '@testing-library/react'

import CreateListModal from '../component'

const mockedHookData = {
  handleOk: jest.fn(),
  handleSubmit: jest.fn(),
  handleAfterClose: jest.fn()
}
jest.mock('../hook', () => jest.fn(() => mockedHookData))

describe('CreateListModal component', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<CreateListModal onCancel={jest.fn()} />)

    expect(asFragment()).toMatchSnapshot()
  })
})
