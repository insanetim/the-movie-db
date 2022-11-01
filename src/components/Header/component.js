import React from 'react'
import { Typography, Row, Col, Avatar, Dropdown, Menu, Layout } from 'antd'
import { CaretDownOutlined, UserOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import * as R from 'ramda'

import { APP_NAME } from 'src/constants'
import { useContainer } from './hook'

const Header = () => {
  const { account, handleLogout } = useContainer()

  const items = [
    { label: <Link to='/'>Dashboard</Link> },
    { type: 'divider' },
    { label: <Link to='/lists'>My Lists</Link> },
    { label: <Link to='/watchlist'>Watchlist</Link> },
    { label: <Link to='/favorites'>Favorites</Link> },
    { type: 'divider' },
    { label: 'Logout', onClick: () => handleLogout() }
  ]
  const menu = <Menu items={items} />

  return (
    <Layout.Header>
      <Row
        type='flex'
        justify='space-between'
      >
        <Col>
          <Typography.Text>{APP_NAME}</Typography.Text>
        </Col>
        <Col>
          <Dropdown overlay={menu}>
            <Typography.Text>
              {R.isEmpty(account) ? (
                <Avatar icon={<UserOutlined />} />
              ) : (
                <Avatar src={`https://www.gravatar.com/avatar/${account.avatar.gravatar.hash}`} />
              )}{' '}
              <span className='hide-sm-down'>{R.isEmpty(account) ? 'Username' : account.username}</span>{' '}
              <CaretDownOutlined />
            </Typography.Text>
          </Dropdown>
        </Col>
      </Row>
    </Layout.Header>
  )
}

export default Header
