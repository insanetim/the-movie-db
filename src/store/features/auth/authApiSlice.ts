import { IAccount } from 'src/interfaces/account.interface'
import { apiSlice } from 'src/store/api'

import {
  RequestToken,
  Session,
  ValidateWithLoginRequest,
  ValidateWithLoginResponse,
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
        method: 'post',
        url: '/authentication/session/new',
      }),
    }),
    deleteSession: builder.mutation<
      { success: boolean },
      { session_id: string }
    >({
      query: data => ({
        body: data,
        method: 'delete',
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
      ValidateWithLoginResponse,
      ValidateWithLoginRequest
    >({
      query: data => ({
        body: data,
        method: 'post',
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
