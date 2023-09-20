import { useSearchParams } from 'react-router-dom'

import type { DashboardHook } from './types'

const useContainer = (): DashboardHook => {
  const searchParams = useSearchParams({ search: '' })[0]
  const query = searchParams.get('search') as string

  return { query }
}

export default useContainer
