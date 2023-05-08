import type { IAccount } from 'src/interfaces/account.interface'

export interface ISessionState {
  sessionId: string
  account: IAccount | null
  loading: boolean
}

export interface IUserData {
  username: string
  password: string
}

export interface IRequestToken {
  expires_at: string
  request_token: string
  success: boolean
}

export interface ISessionToken extends IRequestToken {}

export interface ISession {
  session_id: string
  success: boolean
}
