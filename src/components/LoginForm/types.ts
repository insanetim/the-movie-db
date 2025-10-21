import { UserData } from 'src/store/features/auth'

export type LoginFormProps = {
  isSubmitting: boolean
  onSubmit: (values: UserData) => void
}
