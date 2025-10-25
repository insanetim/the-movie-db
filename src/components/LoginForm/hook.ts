import { selectThemeIsDark } from 'src/store/features/app'
import { useAppSelector } from 'src/store/hooks'

import { LoginFormHookReturn } from './types'

const useContainer = (): LoginFormHookReturn => {
  const isDark = useAppSelector(selectThemeIsDark)

  return { isDark }
}

export default useContainer
