import store from '../index'

it('matches snapshot', () => {
  expect(store).toMatchSnapshot()
})
