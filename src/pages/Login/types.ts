import { UserData } from 'src/store/auth/types'

export type LoginHook = {
  handleLogIn: (userData: UserData) => Promise<void>
  isSubmitting: boolean
}
