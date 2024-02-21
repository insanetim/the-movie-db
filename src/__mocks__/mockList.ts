import { IResponse } from 'src/interfaces/global.interface'
import { IList, IListDetails } from 'src/interfaces/list.interface'

import { mockMovie } from './mockMovie'

const mockList: IList = {
  description: 'test/description',
  id: 1234,
  name: 'test/list',
}

const mockListDetails: IListDetails = {
  ...mockList,
  items: [mockMovie],
  page: 1,
  total_pages: 1,
  total_results: 1,
}

const mockListsResponse: IResponse<IList> = {
  page: 1,
  results: [mockList],
  total_pages: 1,
  total_results: 1,
}

export { mockList, mockListDetails, mockListsResponse }
