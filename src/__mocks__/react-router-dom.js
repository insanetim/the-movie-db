export const location = {}
export const params = {}

export const useLocation = jest.fn(() => location)
export const useNavigate = jest.fn(() => jest.fn())
export const useParams = jest.fn(() => params)
