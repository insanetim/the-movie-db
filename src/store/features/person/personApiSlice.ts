import { IPersonDetails } from 'src/interfaces/person.interface'
import { apiSlice } from 'src/store/api'

export const personApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getPersonDetails: builder.query<IPersonDetails, IPersonDetails['id']>({
      query: personId => ({
        params: { append_to_response: 'external_ids,movie_credits' },
        url: `/person/${personId}`,
      }),
    }),
  }),
})

export const { useGetPersonDetailsQuery } = personApiSlice
