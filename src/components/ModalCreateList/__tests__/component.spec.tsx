import { render } from '@testing-library/react'

import type { ModalCreateListHook } from '../types'
import ModalCreateList from '../component'

const mockedHookData: ModalCreateListHook = {
  handleOk: jest.fn(),
  handleSubmit: jest.fn(),
  handleAfterClose: jest.fn()
}
jest.mock('../hook', () => jest.fn(() => mockedHookData))

describe('ModalCreateList component', () => {
  it('matches snapshot', () => {
    const { baseElement } = render(<ModalCreateList onCancel={jest.fn()} />)

    expect(baseElement).toMatchSnapshot()
  })
})
