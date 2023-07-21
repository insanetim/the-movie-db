import { ReactNode } from 'react'
import { BrowserRouter } from 'react-router-dom'

const Wrapper = ({ children }: { children: ReactNode }) => {
  return <BrowserRouter>{children}</BrowserRouter>
}
export default Wrapper
