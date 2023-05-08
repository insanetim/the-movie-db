import type { Location } from 'react-router-dom'

export interface ProtectedRoutesHook {
  sessionId: string
  location: Location
}
