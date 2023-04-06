export const dispatch = jest.fn()

export const useDispatch = jest.fn(() => dispatch)
export const useSelector = jest.fn(fn => fn())
