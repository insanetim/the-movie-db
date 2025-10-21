export interface IAccount {
  avatar: IAvatar
  id: number
  include_adult: boolean
  iso_639_1: string
  iso_3166_1: string
  name: string
  username: string
}

export interface IAvatar {
  gravatar: { hash: string }
  tmdb: { avatar_path: null | string }
}
