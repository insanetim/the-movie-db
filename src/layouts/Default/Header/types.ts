import { IAccount } from 'src/interfaces/account.interface'

export type HeaderHookReturn = {
  account: IAccount | null
  handleLogin: () => void
  handleLogout: () => void
  sessionId: null | string
}
