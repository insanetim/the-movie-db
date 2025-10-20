import { IAccount } from 'src/interfaces/account.interface'

import getAvatarUrl from '../getAvatarUrl'

describe('getAvatarUrl', () => {
  const baseAccount: IAccount = {
    avatar: {
      gravatar: { hash: 'abcdef1234567890' },
      tmdb: { avatar_path: null },
    },
    id: 1,
    include_adult: false,
    iso_639_1: 'en',
    iso_3166_1: 'US',
    name: 'John Doe',
    username: 'johndoe',
  }

  it('should return TMDB avatar url when tmdb.avatar_path exists', () => {
    const account: IAccount = {
      ...baseAccount,
      avatar: {
        ...baseAccount.avatar,
        tmdb: { avatar_path: '/path/to/avatar.png' },
      },
    }

    const result = getAvatarUrl(account)

    expect(result).toBe(
      'https://www.themoviedb.org/t/p/w32_and_h32_face/path/to/avatar.png'
    )
  })

  it('should return Gravatar url when tmdb.avatar_path is null', () => {
    const account: IAccount = {
      ...baseAccount,
      avatar: {
        gravatar: { hash: '0123456789abcdef' },
        tmdb: { avatar_path: null },
      },
    }

    const result = getAvatarUrl(account)

    expect(result).toBe('https://www.gravatar.com/avatar/0123456789abcdef')
  })
})
