import { theme } from 'antd'
import { selectThemeIsDark } from 'src/store/features/app'
import { useAppSelector } from 'src/store/hooks'

import { ThemeProviderHookReturn } from './types'

const useContainer = (): ThemeProviderHookReturn => {
  const { darkAlgorithm, defaultAlgorithm } = theme
  const isDark = useAppSelector(selectThemeIsDark)

  return { algorithm: isDark ? darkAlgorithm : defaultAlgorithm, isDark }
}

export default useContainer
