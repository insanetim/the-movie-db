/* eslint-disable react/prop-types */
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'

import store from 'src/store'

const Wrapper = ({ children }) => (
  <Provider store={store}>
    <MemoryRouter>{children}</MemoryRouter>
  </Provider>
)

export default Wrapper
