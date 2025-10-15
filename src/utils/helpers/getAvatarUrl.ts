import { IAccount } from 'src/interfaces/account.interface'

export const getAvatarUrl = (account: IAccount) => {
  return account.avatar.tmdb.avatar_path
    ? `https://www.themoviedb.org/t/p/w32_and_h32_face${account.avatar.tmdb.avatar_path}`
    : `https://www.gravatar.com/avatar/${account.avatar.gravatar.hash}`
}
