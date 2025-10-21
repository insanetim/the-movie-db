import { theme } from 'antd'
import { selectTheme } from 'src/store/features/app'
import { useAppSelector } from 'src/store/hooks'

import { ThemeProviderHookReturn } from './types'

const useContainer = (): ThemeProviderHookReturn => {
  const { darkAlgorithm, defaultAlgorithm } = theme
  const currentTheme = useAppSelector(selectTheme)
  const isDark = currentTheme === 'dark'

  return { algorithm: isDark ? darkAlgorithm : defaultAlgorithm, isDark }
}

export default useContainer
