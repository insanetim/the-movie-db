import * as constants from '../index'

it('constants matches snapshot', () => {
  expect(constants).toMatchSnapshot()
})
