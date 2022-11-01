import * as selectors from '../selectors'

it('loadingSelector', () => {
  const loading = 'test/loading'
  const state = { app: { loading } }

  expect(selectors.loadingSelector(state)).toEqual(loading)
})

it('modalTypeSelector', () => {
  const modalType = 'test/modalType'
  const state = { app: { modal: { modalType } } }

  expect(selectors.modalTypeSelector(state)).toEqual(modalType)
})

it('modalPropsSelector', () => {
  const modalProps = 'test/modalProps'
  const state = { app: { modal: { modalProps } } }

  expect(selectors.modalPropsSelector(state)).toEqual(modalProps)
})
