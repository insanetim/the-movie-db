import { shallow } from 'enzyme'

import Error from '../component'

it('matches snapshot', () => {
  const error = {
    message: 'test/errorTitle',
    response: { data: { status_message: 'test/errorSubtitle' } }
  }
  const component = shallow(<Error error={error} />)

  expect(component).toMatchSnapshot()
})
