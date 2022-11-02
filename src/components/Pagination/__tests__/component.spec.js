import { shallow } from 'enzyme'

import Pagination from '../component'

it('matches snapshot', () => {
  const component = shallow(<Pagination />)

  expect(component).toMatchSnapshot()
})
