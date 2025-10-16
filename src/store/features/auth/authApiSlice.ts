import { IAccount } from 'src/interfaces/account.interface'
import { apiSlice } from 'src/store/api'

import {
  RequestToken,
  Session,
  ValidateWithLoginReq,
  ValidateWithLoginRes,
} from './types'

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    createRequestToken: builder.query<RequestToken, void>({
      query: () => ({
        url: '/authentication/token/new',
      }),
    }),
    createSession: builder.mutation<Session, { request_token: string }>({
      query: data => ({
        body: data,
        method: 'POST',
        url: '/authentication/session/new',
      }),
    }),
    deleteSession: builder.mutation<
      { success: boolean },
      { session_id: string }
    >({
      query: data => ({
        body: data,
        method: 'DELETE',
        url: '/authentication/session',
      }),
    }),
    getAccount: builder.query<IAccount, { session_id: string }>({
      query: data => ({
        params: data,
        url: '/account',
      }),
    }),
    validateWithLogin: builder.mutation<
      ValidateWithLoginRes,
      ValidateWithLoginReq
    >({
      query: data => ({
        body: data,
        method: 'POST',
        url: '/authentication/token/validate_with_login',
      }),
    }),
  }),
})

export const {
  useCreateSessionMutation,
  useDeleteSessionMutation,
  useGetAccountQuery,
  useLazyCreateRequestTokenQuery,
  useValidateWithLoginMutation,
} = authApiSlice
