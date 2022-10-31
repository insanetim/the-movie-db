import { shallow } from 'enzyme'
import Layout from '../component'

it('matches snapshot', () => {
  const component = shallow(<Layout />)

  expect(component).toMatchSnapshot()
})
