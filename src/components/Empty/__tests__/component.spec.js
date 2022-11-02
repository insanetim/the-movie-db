import { shallow } from 'enzyme'

import Empty from '../component'

it('matches snapshot', () => {
  const component = shallow(<Empty description='No Results' />)

  expect(component).toMatchSnapshot()
})
