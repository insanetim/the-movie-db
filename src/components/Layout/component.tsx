import { Layout as AntdLayout } from 'antd'
import { Outlet } from 'react-router-dom'

import Footer from './Footer'
import Header from './Header'

const Layout: React.FC = () => (
  <AntdLayout>
    <Header />
    <AntdLayout.Content>
      <Outlet />
    </AntdLayout.Content>
    <Footer />
  </AntdLayout>
)

export default Layout
