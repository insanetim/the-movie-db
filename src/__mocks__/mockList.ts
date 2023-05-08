import type { IList, IListDetail } from 'src/interfaces/list.interface'
import { mockMovie } from './mockMovie'

export const mockList: IList = {
  description: 'test/description',
  favorite_count: 0,
  id: 123,
  iso_639_1: 'en',
  item_count: 1,
  list_type: '',
  name: 'test/list',
  poster_path: null
}

export const mockListDetail: IListDetail = {
  description: 'test/description',
  favorite_count: 0,
  id: 123,
  iso_639_1: 'en',
  item_count: 1,
  list_type: '',
  name: 'test/list',
  poster_path: null,
  created_by: 'test/author',
  items: [mockMovie]
}
