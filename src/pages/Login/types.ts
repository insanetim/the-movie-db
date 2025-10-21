import { UserData } from 'src/store/features/auth'

export type LoginHookReturn = {
  handleLogin: (userData: UserData) => Promise<void>
  isSubmitting: boolean
}
