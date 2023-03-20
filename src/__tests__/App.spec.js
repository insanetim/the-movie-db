/* eslint-disable react/jsx-no-useless-fragment */
import { shallow } from 'enzyme'

import App from 'src/App'

jest.mock('react-router-dom', () => ({
  BrowserRouter: () => <></>,
  Route: () => <></>,
  Routes: () => <></>
}))

it('matches snapshot', () => {
  const component = shallow(<App />)

  expect(component).toMatchSnapshot()
})
