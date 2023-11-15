import type { IList, IListDetail } from 'src/interfaces/list.interface'

import { mockMovie } from './mockMovie'

const mockList: IList = {
  description: 'test/description',
  favorite_count: 0,
  id: 123,
  iso_639_1: 'en',
  item_count: 1,
  list_type: '',
  name: 'test/list',
  poster_path: null
}

const mockListDetail: IListDetail = {
  created_by: 'test/author',
  description: 'test/description',
  favorite_count: 0,
  id: 123,
  iso_639_1: 'en',
  item_count: 1,
  items: [mockMovie],
  list_type: '',
  name: 'test/list',
  page: 1,
  poster_path: null,
  total_pages: 1,
  total_results: 1
}

export { mockList, mockListDetail }
