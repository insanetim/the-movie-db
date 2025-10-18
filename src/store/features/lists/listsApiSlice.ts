import { MutationResponse } from 'src/interfaces/global.interface'
import { IList, IListDetails, IListsList } from 'src/interfaces/list.interface'
import { RootState } from 'src/store'
import { apiSlice } from 'src/store/api'

import { selectAccount, selectSessionId } from '../auth'
import { CreateListRes, GetListDetailsReq, ListData } from './types'

export const listsApiSlice = apiSlice
  .enhanceEndpoints({
    addTagTypes: ['Lists', 'ListDetails'],
  })
  .injectEndpoints({
    endpoints: builder => ({
      createList: builder.mutation<CreateListRes, ListData>({
        invalidatesTags: ['Lists'],
        queryFn: async (
          listData,
          { getState },
          _extraOptions,
          fetchBaseQuery
        ) => {
          const sessionId = selectSessionId(getState() as RootState)!

          const { data, error } = await fetchBaseQuery({
            body: listData,
            method: 'POST',
            params: { session_id: sessionId },
            url: '/list',
          })
          if (error) return { error }

          return { data: data as CreateListRes }
        },
      }),
      deleteList: builder.mutation<MutationResponse, IList['id']>({
        invalidatesTags: ['Lists'],
        queryFn: async (
          listId,
          { getState },
          _extraOptions,
          fetchBaseQuery
        ) => {
          const sessionId = selectSessionId(getState() as RootState)!

          const { data, error } = await fetchBaseQuery({
            method: 'DELETE',
            params: { session_id: sessionId },
            url: `/list/${listId}`,
          })
          if (error) return { error }

          return { data: data as MutationResponse }
        },
      }),
      getListDetails: builder.query<IListDetails, GetListDetailsReq>({
        providesTags: ['ListDetails'],
        query: ({ listId, page }) => ({
          params: { page },
          url: `/list/${listId}`,
        }),
      }),
      getLists: builder.query<IListsList, string>({
        providesTags: ['Lists'],
        queryFn: async (page, { getState }, _extraOptions, fetchBaseQuery) => {
          const account = selectAccount(getState() as RootState)!
          const sessionId = selectSessionId(getState() as RootState)!

          const { data, error } = await fetchBaseQuery({
            params: { page, session_id: sessionId },
            url: `/account/${account.id}/lists`,
          })
          if (error) return { error }

          return { data: data as IListsList }
        },
      }),
    }),
  })

export const {
  useCreateListMutation,
  useDeleteListMutation,
  useGetListDetailsQuery,
  useGetListsQuery,
} = listsApiSlice
