import type { IUserData } from 'src/store/session/types'

export interface LoginHook {
  loading: boolean
  handleLogIn: (userData: IUserData) => Promise<void>
}
