import { useSearchParams } from 'react-router-dom'

import { DashboardHook } from './types'

const useContainer = (): DashboardHook => {
  const searchParams = useSearchParams()[0]
  const query = searchParams.get('search') ?? ''

  return { query }
}

export default useContainer
