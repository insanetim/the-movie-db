import { theme } from 'antd'
import { themeSelector } from 'src/store/features/app'
import { useAppSelector } from 'src/store/hooks'

import { ThemeProviderHookReturn } from './types'

const useContainer = (): ThemeProviderHookReturn => {
  const { darkAlgorithm, defaultAlgorithm } = theme
  const currentTheme = useAppSelector(themeSelector)
  const isDark = currentTheme === 'dark'

  return { algorithm: isDark ? darkAlgorithm : defaultAlgorithm, isDark }
}

export default useContainer
