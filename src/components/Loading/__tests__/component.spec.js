import { shallow } from 'enzyme'

import Loading from '../component'

it('matches snapshot', () => {
  const component = shallow(<Loading />)

  expect(component).toMatchSnapshot()
})
