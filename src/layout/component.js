import React from 'react'
import { Outlet } from 'react-router-dom'
import { Layout as AntdLayout } from 'antd'

import Header from 'src/components/Header'
import ModalRoot from 'src/components/ModalRoot'
import NotificationsRoot from 'src/components/NotificationsRoot'

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
