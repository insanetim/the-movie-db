import { Outlet } from 'react-router-dom'
import { Layout as AntdLayout } from 'antd'

import Header from './Header'
import Footer from './Footer'

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
