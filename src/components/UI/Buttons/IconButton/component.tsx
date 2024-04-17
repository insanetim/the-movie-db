import { Button } from 'antd'

import { IconButtonProps } from './types'

const IconButton: React.FC<IconButtonProps> = ({ icon, ...rest }) => {
  return (
    <Button
      icon={icon}
      shape='circle'
      type='text'
      {...rest}
    />
  )
}

export default IconButton
