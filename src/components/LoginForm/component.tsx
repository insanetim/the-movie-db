import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, Input, Typography } from 'antd'

import useContainer from './hook'
import { LoginFormProps } from './types'

const LoginForm: React.FC<LoginFormProps> = ({ isSubmitting, onSubmit }) => {
  const { isDark } = useContainer()

  const iconColor = isDark ? 'rgba(255,255,255,.45)' : 'rgba(0,0,0,.45)'

  return (
    <Form
      autoComplete='off'
      onFinish={onSubmit}
    >
      <Typography.Title className='text-center'>The Movie DB</Typography.Title>
      <Form.Item
        name='username'
        rules={[{ message: 'Username is required', required: true }]}
      >
        <Input
          placeholder='Username'
          prefix={<UserOutlined style={{ color: iconColor }} />}
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
        <Input.Password
          placeholder='Password'
          prefix={<LockOutlined style={{ color: iconColor }} />}
        />
      </Form.Item>
      <Form.Item>
        <Button
          htmlType='submit'
          loading={isSubmitting}
          type='primary'
        >
          Sign in
        </Button>
      </Form.Item>
    </Form>
  )
}

export default LoginForm
