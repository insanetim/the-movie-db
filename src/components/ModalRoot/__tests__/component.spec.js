import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { render } from '@testing-library/react'

import store from 'src/store'
import ModalRoot from '../component'

let mockedHookData = {
  modalType: 'CREATE_LIST_MODAL',
  modalProps: {},
  onCancel: jest.fn()
}
jest.mock('../hook', () => jest.fn(() => mockedHookData))

describe('ModalRoot component', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <MemoryRouter>
          <ModalRoot />
        </MemoryRouter>
      </Provider>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('return null unless modalType present', () => {
    mockedHookData = {
      modalType: undefined
    }
    const { asFragment } = render(
      <Provider store={store}>
        <MemoryRouter>
          <ModalRoot />
        </MemoryRouter>
      </Provider>
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
