import { UserData } from 'src/store/auth/types'

export type LoginHookReturn = {
  handleLogin: (userData: UserData) => Promise<void>
  isSubmitting: boolean
}
