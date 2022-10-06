import React from 'react'
import { Typography, Row, Col, Avatar, Dropdown, Menu, Layout } from 'antd'
import { CaretDownOutlined, UserOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

const Header = () => {
  const items = [
    { label: <Link to='/'>Dashboard</Link> },
    { type: 'divider' },
    { label: <Link to='/lists'>My Lists</Link> },
    { label: <Link to='/watchlist'>Watchlist</Link> },
    { label: <Link to='/favorites'>Favorites</Link> },
    { type: 'divider' },
    { label: 'Logout' }
  ]
  const menu = <Menu items={items} />

  return (
    <Layout.Header>
      <Row
        type='flex'
        justify='space-between'
      >
        <Col>
          <Typography.Text>THE MOVIE DB</Typography.Text>
        </Col>
        <Col>
          <Dropdown overlay={menu}>
            <Typography.Text>
              <Avatar icon={<UserOutlined />} /> <span className='hide-sm-down'>Username</span> <CaretDownOutlined />
            </Typography.Text>
          </Dropdown>
        </Col>
      </Row>
    </Layout.Header>
  )
}

export default Header
