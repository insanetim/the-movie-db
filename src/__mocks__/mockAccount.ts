import { IAccount } from 'src/interfaces/account.interface'

const mockAccount: IAccount = {
  avatar: { gravatar: { hash: 'image' }, tmdb: { avatar_path: null } },
  id: 1234,
  include_adult: true,
  iso_639_1: 'en',
  iso_3166_1: 'US',
  name: 'test/name',
  username: 'test/username',
}

export default mockAccount
