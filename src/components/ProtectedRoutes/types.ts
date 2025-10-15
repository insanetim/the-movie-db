import { Location } from 'react-router-dom'

export type ProtectedRoutesHookReturn = {
  location: Location
  sessionId: null | string
}
