import { IAccount } from 'src/interfaces/account.interface'
import { apiSlice } from 'src/store/api'

import { RequestToken, Session, ValidateWithLoginReq } from './types'

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    createRequestToken: builder.query<RequestToken, void>({
      query: () => ({
        url: '/authentication/token/new',
      }),
    }),
    createSession: builder.mutation<Session, RequestToken['request_token']>({
      query: request_token => ({
        body: { request_token },
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
    getAccount: builder.query<IAccount, Session['session_id']>({
      query: session_id => ({
        params: { session_id },
        url: '/account',
      }),
    }),
    validateWithLogin: builder.mutation<RequestToken, ValidateWithLoginReq>({
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
