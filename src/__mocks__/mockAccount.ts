import { IAccount } from 'src/interfaces/account.interface'

const mockAccount: IAccount = {
  avatar: {
    gravatar: {
      hash: 'image',
    },
    tmdb: {
      avatar_path: undefined,
    },
  },
  id: 1234,
  username: 'test/username',
}

export default mockAccount
