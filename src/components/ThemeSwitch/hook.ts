import { setTheme, themeSelector } from 'src/store/app/reducer'
import { Theme } from 'src/store/app/types'
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
