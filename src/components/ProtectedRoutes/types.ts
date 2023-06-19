import type { Location } from 'react-router-dom'

export interface ProtectedRoutesHook {
  location: Location
  sessionId: string
}
