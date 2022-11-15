import React from 'react'
import { Typography, Row, Col, Avatar, Dropdown, Layout } from 'antd'
import { CaretDownOutlined, UserOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { isEmpty } from 'ramda'

import { APP_NAME } from 'src/constants'
import useContainer from './hook'

const Header = () => {
  const { account, handleLogOut } = useContainer()

  const items = [
    { key: 'item-1', label: <Link to='/'>Dashboard</Link> },
    { key: 'item-2', type: 'divider' },
    { key: 'item-3', label: <Link to='/lists'>My Lists</Link> },
    { key: 'item-4', label: <Link to='/watchlist'>Watchlist</Link> },
    { key: 'item-5', label: <Link to='/favorites'>Favorites</Link> },
    { key: 'item-6', type: 'divider' },
    { key: 'item-7', label: 'Logout', onClick: handleLogOut }
  ]

  return (
    <Layout.Header>
      <Row justify='space-between'>
        <Col>
          <Typography.Text>{APP_NAME}</Typography.Text>
        </Col>
        <Col>
          <Dropdown menu={{ items }}>
            <Typography.Text>
              {isEmpty(account) ? (
                <Avatar icon={<UserOutlined />} />
              ) : (
                <Avatar src={`https://www.gravatar.com/avatar/${account.avatar.gravatar.hash}`} />
              )}{' '}
              <span className='hide-sm-down'>{isEmpty(account) ? 'Username' : account.username}</span>{' '}
              <CaretDownOutlined />
            </Typography.Text>
          </Dropdown>
        </Col>
      </Row>
    </Layout.Header>
  )
}

export default Header
