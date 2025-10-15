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

export type ValidateWithLoginRequest = UserData & {
  request_token: string
}

export type ValidateWithLoginResponse = {
  expires_at: string
  request_token: string
  success: boolean
}
