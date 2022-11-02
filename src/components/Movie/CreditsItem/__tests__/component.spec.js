import { shallow } from 'enzyme'

import CreditsItem from '../component'

it('matches snapshot', () => {
  const component = shallow(<CreditsItem profilePath='test/image' />)

  expect(component).toMatchSnapshot()
})

it('matches snapshot with NoImage', () => {
  const component = shallow(<CreditsItem profilePath='' />)

  expect(component).toMatchSnapshot()
})
