import { IUserData } from 'src/store/auth/types'

export interface LoginHook {
  handleLogIn: (userData: IUserData) => Promise<void>
  isSubmitting: boolean
}
