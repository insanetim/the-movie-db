import { render } from '@testing-library/react'
import { createRef } from 'react'

import ModalCreateList from '../component'
import { ModalCreateListHookReturn } from '../types'

const mockedHook: ModalCreateListHookReturn = {
  handleAfterClose: jest.fn(),
  handleAfterOpenChange: jest.fn(),
  handleOk: jest.fn(),
  handleSubmit: jest.fn(),
  inputRef: createRef(),
}

jest.mock('../hook', () => jest.fn(() => mockedHook))

describe('ModalCreateList component', () => {
  it('should match snapshot', () => {
    const { baseElement } = render(<ModalCreateList onCancel={jest.fn()} />)

    expect(baseElement).toMatchSnapshot()
  })
})
