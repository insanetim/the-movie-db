import { Button } from 'antd'

import { IconButtonProps } from './types'

const IconButton: React.FC<IconButtonProps> = ({ icon, ...props }) => {
  return (
    <Button
      icon={icon}
      shape='circle'
      type='text'
      {...props}
    />
  )
}

export default IconButton
