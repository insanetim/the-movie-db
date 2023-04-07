import { Outlet } from 'react-router-dom'
import { Layout as AntdLayout } from 'antd'

import Header from './Header'
import ModalRoot from '../ModalRoot'
import NotificationsRoot from '../NotificationsRoot'

const Layout = () => (
  <>
    <AntdLayout>
      <Header />
      <AntdLayout.Content>
        <Outlet />
      </AntdLayout.Content>
    </AntdLayout>
    <ModalRoot />
    <NotificationsRoot />
  </>
)

export default Layout
