import { IAccount } from 'src/interfaces/account.interface'

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

export interface SessionState {
  account: IAccount | null
  sessionId: string
}
