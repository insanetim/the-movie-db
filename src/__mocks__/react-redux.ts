const dispatch = jest.fn()
const getState = jest.fn()

const useDispatch = jest.fn(() => dispatch)
const useSelector = jest.fn(fn => fn())

export { dispatch, getState, useDispatch, useSelector }
