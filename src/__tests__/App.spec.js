import { shallow } from 'enzyme'

import App from 'src/App'

it('matches snapshot', () => {
  const component = shallow(<App />)
  expect(component).toMatchSnapshot()
})
