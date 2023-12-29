import { UserData } from 'src/store/auth/types'

export type LoginFormProps = {
  isSubmitting: boolean
  onSubmit: (values: UserData) => void
}
