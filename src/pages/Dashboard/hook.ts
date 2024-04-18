import { useSearchParams } from 'react-router-dom'

import { DashboardHookReturn } from './types'

const useContainer = (): DashboardHookReturn => {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('search') || ''

  return { query }
}

export default useContainer
