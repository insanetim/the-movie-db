import { IAccount } from 'src/interfaces/account.interface'

export type AuthState = {
  account: IAccount | null
  sessionId: null | string
}

export type RequestToken = {
  expires_at: string
  request_token: string
  success: boolean
}

export type Session = {
  session_id: string
  success: boolean
}

export type UserData = {
  password: string
  username: string
}

export type ValidateWithLoginReq = UserData & {
  request_token: string
}

export type ValidateWithLoginRes = {
  expires_at: string
  request_token: string
  success: boolean
}
