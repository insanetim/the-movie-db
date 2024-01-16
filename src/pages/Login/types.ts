import { UserData } from 'src/store/auth/types'

export type LoginHookReturn = {
  handleLogIn: (userData: UserData) => Promise<void>
  isSubmitting: boolean
}
