import getParams from 'src/utils/helpers/getParams'

import useUpdatePage from '../useUpdatePage'

jest.mock('src/utils/helpers/getParams')

const mockGetParams = getParams as jest.MockedFunction<typeof getParams>

describe('useUpdatePage', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should decrement page when there is exactly 1 item and page > 1', () => {
    const setSearchParams = jest.fn()
    const items = [{}]
    const page = '3'
    const expectedParams: ReturnType<typeof getParams> = { page: '2' }
    mockGetParams.mockReturnValue(expectedParams)

    const { updatePage } = useUpdatePage({ items, page, setSearchParams })

    updatePage()

    expect(mockGetParams).toHaveBeenCalledWith({ page: 2 })
    expect(setSearchParams).toHaveBeenCalledWith(expectedParams)
  })

  it('should not change page when items length is not 1', () => {
    const setSearchParams = jest.fn()
    const items = [{}, {}]
    const page = '5'

    const { updatePage } = useUpdatePage({ items, page, setSearchParams })

    updatePage()

    expect(setSearchParams).not.toHaveBeenCalled()
    expect(mockGetParams).not.toHaveBeenCalled()
  })

  it('should not change page when current page is 1', () => {
    const setSearchParams = jest.fn()
    const items = [{}]
    const page = '1'

    const { updatePage } = useUpdatePage({ items, page, setSearchParams })

    updatePage()

    expect(setSearchParams).not.toHaveBeenCalled()
    expect(mockGetParams).not.toHaveBeenCalled()
  })

  it('should not change page when page is not a valid number', () => {
    const setSearchParams = jest.fn()
    const items = [{}]
    const page = 'abc'

    const { updatePage } = useUpdatePage({ items, page, setSearchParams })

    updatePage()

    expect(setSearchParams).not.toHaveBeenCalled()
    expect(mockGetParams).not.toHaveBeenCalled()
  })
})
