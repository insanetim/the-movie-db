import { Location } from 'react-router-dom'

export interface ProtectedRoutesHook {
  isAuthenticated: boolean
  location: Location
}
