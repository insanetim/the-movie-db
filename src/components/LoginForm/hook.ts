import { selectThemeIsDark } from 'src/store/features/app'
import { useAppSelector } from 'src/store/hooks'

const useContainer = () => {
  const isDark = useAppSelector(selectThemeIsDark)

  return { isDark }
}

export default useContainer
