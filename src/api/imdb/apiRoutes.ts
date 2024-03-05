import { IMDBInfo } from 'src/interfaces/movie.interface'

import imdbClient from './apiClient'

// Get details of a title
export const getImdbInfo = async ({ imdbId }: { imdbId: string }) => {
  const { data } = await imdbClient.request<IMDBInfo>({
    url: `/title/${imdbId}`,
  })

  return data
}
