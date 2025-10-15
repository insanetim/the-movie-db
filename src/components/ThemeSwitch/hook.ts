import { setTheme, Theme, themeSelector } from 'src/store/features/app'
import { useAppDispatch, useAppSelector } from 'src/store/hooks'

import { ThemeSwitchHookReturn } from './types'

const useContainer = (): ThemeSwitchHookReturn => {
  const dispatch = useAppDispatch()
  const currentTheme = useAppSelector(themeSelector)

  const handleChange = (value: Theme) => {
    dispatch(setTheme(value))
  }

  return { currentTheme, handleChange }
}

export default useContainer
