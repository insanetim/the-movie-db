import { Card } from 'antd'
import NoImage from 'src/assets/images/no-image.svg'
import isNull from 'src/utils/helpers/isNull'

import type { CreditsItemProps } from './types'

const CreditsItem: React.FC<CreditsItemProps> = ({
  description,
  profilePath,
  title
}) => {
  let cover = (
    <div className='ant-card-cover--no-image'>
      <img
        alt={title}
        src={NoImage}
      />
    </div>
  )
  if (!isNull(profilePath)) {
    cover = (
      <img
        alt={title}
        src={`https://image.tmdb.org/t/p/w500${profilePath}`}
      />
    )
  }

  return (
    <Card cover={cover}>
      <Card.Meta
        description={description}
        title={title}
      />
    </Card>
  )
}

export default CreditsItem
