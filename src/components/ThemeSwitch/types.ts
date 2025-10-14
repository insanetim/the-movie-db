import { Theme } from 'src/store/app/types'

export type ThemeSwitchHookReturn = {
  currentTheme: Theme
  handleChange: (value: Theme) => void
}
