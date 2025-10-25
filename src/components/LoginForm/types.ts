import { UserData } from 'src/store/features/auth'

export type LoginFormHookReturn = {
  isDark: boolean
}

export type LoginFormProps = {
  isSubmitting: boolean
  onSubmit: (values: UserData) => void
}
