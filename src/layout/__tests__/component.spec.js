import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'

import store from 'src/store'
import Layout from '../component'

describe('Layout component', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Layout />
        </MemoryRouter>
      </Provider>
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
