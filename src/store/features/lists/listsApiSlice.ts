import { MutationResponse } from 'src/interfaces/global.interface'
import { IList, IListDetails, IListsList } from 'src/interfaces/list.interface'
import { RootState } from 'src/store'
import { apiSlice } from 'src/store/api'

import { selectAccount, selectSessionId } from '../auth'
import {
  CreateListRes,
  GetListDetailsReq,
  ListData,
  MovieListOperationReq,
} from './types'

export const listsApiSlice = apiSlice
  .enhanceEndpoints({
    addTagTypes: ['Lists', 'ListDetails'],
  })
  .injectEndpoints({
    endpoints: builder => ({
      addMovieToList: builder.mutation<MutationResponse, MovieListOperationReq>(
        {
          invalidatesTags: (_result, _error, { listId }) => [
            { id: listId, type: 'ListDetails' },
          ],
          queryFn: async (
            { listId, movieId },
            { getState },
            _extraOptions,
            fetchBaseQuery
          ) => {
            const sessionId = selectSessionId(getState() as RootState)!

            const { data, error } = await fetchBaseQuery({
              body: { media_id: movieId },
              method: 'POST',
              params: { session_id: sessionId },
              url: `/list/${listId}/add_item`,
            })
            if (error) return { error }

            return { data: data as MutationResponse }
          },
        }
      ),
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
        providesTags: (_result, _error, { listId }) => [
          { id: listId, type: 'ListDetails' },
        ],
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
      removeMovieFromList: builder.mutation<
        MutationResponse,
        MovieListOperationReq
      >({
        invalidatesTags: (_result, _error, { listId }) => [
          { id: listId, type: 'ListDetails' },
        ],
        queryFn: async (
          { listId, movieId },
          { getState },
          _extraOptions,
          fetchBaseQuery
        ) => {
          const sessionId = selectSessionId(getState() as RootState)!

          const { data, error } = await fetchBaseQuery({
            body: { media_id: movieId },
            method: 'POST',
            params: { session_id: sessionId },
            url: `/list/${listId}/remove_item`,
          })
          if (error) return { error }

          return { data: data as MutationResponse }
        },
      }),
    }),
  })

export const {
  useAddMovieToListMutation,
  useCreateListMutation,
  useDeleteListMutation,
  useGetListDetailsQuery,
  useGetListsQuery,
  usePrefetch,
  useRemoveMovieFromListMutation,
} = listsApiSlice
