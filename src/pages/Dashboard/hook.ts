import { useSearchParams } from 'react-router-dom'

import { DashboardHookReturn } from './types'

const useContainer = (): DashboardHookReturn => {
  const searchParams = useSearchParams()[0]
  const query = searchParams.get('search') ?? ''

  return { query }
}

export default useContainer
