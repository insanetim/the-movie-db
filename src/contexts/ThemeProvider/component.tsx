import { ConfigProvider } from 'antd'
import { PropsWithChildren } from 'react'

import useContainer from './hook'

const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { algorithm, isDark } = useContainer()

  return (
    <ConfigProvider
      theme={{
        algorithm,
        components: {
          Layout: {
            bodyBg: isDark ? '#121212' : '#fff',
            footerBg: isDark ? '#121212' : '#f5f5f5',
            headerBg: isDark ? '#021525' : '#032541',
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  )
}

export default ThemeProvider
