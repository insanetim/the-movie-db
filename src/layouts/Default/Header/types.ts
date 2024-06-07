import { IAccount } from 'src/interfaces/account.interface'

export type HeaderHookReturn = {
  account: IAccount | null
  handleLogIn: () => void
  handleLogOut: () => void
  isAuthenticated: boolean
}
