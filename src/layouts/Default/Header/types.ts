import { IAccount } from 'src/interfaces/account.interface'

export type HeaderHook = {
  account: IAccount | null
  handleLogOut: () => Promise<void>
}
