import { Result } from 'antd'

import { ErrorProps } from './types'

const Error: React.FC<ErrorProps> = ({ error }) => {
  return (
    <Result
      status='error'
      title={error}
    />
  )
}

export default Error
