import { render } from '@testing-library/react'

import ModalCreateList from '../component'
import { ModalCreateListHook } from '../types'

const mockedHookData: ModalCreateListHook = {
  handleAfterClose: jest.fn(),
  handleOk: jest.fn(),
  handleSubmit: jest.fn()
}
jest.mock('../hook', () => jest.fn(() => mockedHookData))

describe('ModalCreateList component', () => {
  it('should match snapshot', () => {
    const { baseElement } = render(<ModalCreateList onCancel={jest.fn()} />)

    expect(baseElement).toMatchSnapshot()
  })
})
