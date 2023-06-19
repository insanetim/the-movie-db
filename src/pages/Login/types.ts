import type { IUserData } from 'src/store/session/types'

export interface LoginHook {
  handleLogIn: (userData: IUserData) => Promise<void>
  loading: boolean
}
