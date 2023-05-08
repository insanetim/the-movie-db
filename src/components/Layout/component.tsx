import { Outlet } from 'react-router-dom'
import { Layout as AntdLayout } from 'antd'

import Header from './Header'

const Layout: React.FC = () => (
  <AntdLayout>
    <Header />
    <AntdLayout.Content>
      <Outlet />
    </AntdLayout.Content>
  </AntdLayout>
)

export default Layout
