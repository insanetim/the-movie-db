import { Location } from 'react-router-dom'

export type ProtectedRoutesHook = {
  isAuthenticated: boolean
  location: Location
}
