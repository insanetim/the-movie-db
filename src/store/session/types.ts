import type { IAccount } from 'src/interfaces/account.interface'

export interface ISessionState {
  account: IAccount | null
  loading: boolean
  sessionId: string
}

export interface IUserData {
  password: string
  username: string
}

export interface IRequestToken {
  expires_at: string
  request_token: string
  success: boolean
}

export interface ISession {
  session_id: string
  success: boolean
}
