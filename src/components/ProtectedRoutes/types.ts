import { Location } from 'react-router-dom'

export type ProtectedRoutesHookReturn = {
  isAuthenticated: boolean
  location: Location
}
