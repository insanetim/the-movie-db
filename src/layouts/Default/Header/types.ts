import { IAccount } from 'src/interfaces/account.interface'

export interface HeaderHook {
  account: IAccount | null
  handleLogOut: () => Promise<void>
}
