import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, Input, Typography } from 'antd'

import { LoginFormProps } from './types'

const LoginForm: React.FC<LoginFormProps> = ({ isSubmitting, onSubmit }) => (
  <Form
    autoComplete='off'
    onFinish={onSubmit}
  >
    <Typography.Title>The Movie DB</Typography.Title>
    <Form.Item
      name='username'
      rules={[{ message: 'Username is required', required: true }]}
    >
      <Input
        placeholder='Username'
        prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
      />
    </Form.Item>
    <Form.Item
      name='password'
      rules={[
        { message: 'Password is required', required: true },
        {
          message: 'Password must be at least 4 characters',
          min: 4,
        },
      ]}
    >
      <Input
        placeholder='Password'
        prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
        type='password'
      />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType='submit'
        loading={isSubmitting}
        type='primary'
      >
        Log in
      </Button>
    </Form.Item>
  </Form>
)

export default LoginForm
