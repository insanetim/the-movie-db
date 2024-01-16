import { IAccount } from 'src/interfaces/account.interface'

export type HeaderHookReturn = {
  account: IAccount | null
  handleLogOut: () => Promise<void>
}
