import { IListDetails } from 'src/interfaces/list.interface'
import { apiSlice } from 'src/store/api'

import { GetListDetailsReq } from './types'

export const listsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getListDetails: builder.query<IListDetails, GetListDetailsReq>({
      query: ({ listId, page }) => ({
        params: { page },
        url: `/list/${listId}`,
      }),
    }),
  }),
})

export const { useGetListDetailsQuery } = listsApiSlice
