import { useLocation } from 'react-router-dom'

import type { DashboardHook } from './types'

const useContainer = (): DashboardHook => {
  const location = useLocation()

  const params = new URLSearchParams(location.search)
  const query = params.get('search') ?? ''

  return { query }
}

export default useContainer
