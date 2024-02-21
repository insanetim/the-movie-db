export interface IAvatar {
  gravatar: { hash: string }
  tmdb: { avatar_path?: string }
}

export interface IAccount {
  avatar: IAvatar
  id: number
  username: string
}
