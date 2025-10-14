import { PropsWithChildren } from 'react'

const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return <>{children}</>
}

export default ThemeProvider
