import React from 'react'
import { Outlet } from 'react-router-dom'
import { Layout as AntdLayout } from 'antd'

import Header from 'src/components/Header'
import CreateListModal from 'src/components/CreateListModal'

const Layout = () => (
  <AntdLayout>
    <Header />
    <AntdLayout.Content>
      <Outlet />
    </AntdLayout.Content>
    <CreateListModal />
  </AntdLayout>
)

export default Layout
