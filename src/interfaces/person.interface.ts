export interface IExternalIds {
  facebook_id?: string
  instagram_id?: string
  tiktok_id?: string
  twitter_id?: string
}

export interface IPersonCredit {
  character?: string
  department?: string
  id: number
  job?: string
  popularity: number
  poster_path: null | string
  release_date: string
  title: string
}

export interface IPersonDetails extends IPerson {
  external_ids: IExternalIds
  movie_credits: {
    cast: IPersonCredit[]
    crew: IPersonCredit[]
  }
}

interface IPerson {
  biography: string
  birthday?: string
  deathday?: string
  gender: number
  id: number
  known_for_department: string
  name: string
  place_of_birth?: string
  popularity: number
  profile_path?: string
}
