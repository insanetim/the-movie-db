import { createRef } from 'react'
import { renderWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import ModalCreateList from '../component'
import { ModalCreateListHookReturn } from '../types'

const mockedHook: ModalCreateListHookReturn = {
  handleAfterOpenChange: jest.fn(),
  handleOk: jest.fn(),
  handleSubmit: jest.fn(),
  inputRef: createRef(),
  isSubmitting: false,
}
jest.mock('../hook', () => jest.fn(() => mockedHook))

describe('ModalCreateList component', () => {
  it('should match snapshot', () => {
    const { baseElement } = renderWithWrapper(
      <ModalCreateList onCancel={jest.fn()} />
    )

    expect(baseElement).toMatchSnapshot()
  })
})
