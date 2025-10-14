import { ConfigProvider, theme } from 'antd'
import { PropsWithChildren } from 'react'
import { themeSelector } from 'src/store/app/reducer'
import { useAppSelector } from 'src/store/hooks'

const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const currentTheme = useAppSelector(themeSelector)
  const { darkAlgorithm, defaultAlgorithm } = theme

  return (
    <ConfigProvider
      theme={{
        algorithm: currentTheme === 'dark' ? darkAlgorithm : defaultAlgorithm,
      }}
    >
      {children}
    </ConfigProvider>
  )
}

export default ThemeProvider
