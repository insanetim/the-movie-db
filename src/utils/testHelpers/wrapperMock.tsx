import { ReactNode } from 'react'
import { MemoryRouter } from 'react-router-dom'

const Wrapper = ({ children }: { children: ReactNode }) => {
  return <MemoryRouter>{children}</MemoryRouter>
}
export default Wrapper
