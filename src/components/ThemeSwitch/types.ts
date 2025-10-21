import { Theme } from 'src/store/features/app'

export type ThemeSwitchHookReturn = {
  currentTheme: Theme
  handleChange: (value: Theme) => void
}
