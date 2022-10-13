import React from 'react'
import { Outlet } from 'react-router-dom'
import { Layout as AntdLayout } from 'antd'

import Header from 'src/components/Header'
import ModalRoot from 'src/components/ModalRoot'

const Layout = () => (
  <AntdLayout>
    <Header />
    <AntdLayout.Content>
      <Outlet />
    </AntdLayout.Content>
    <ModalRoot />
  </AntdLayout>
)

export default Layout
