import { Card } from 'antd'

import type { CreditsItemProps } from './types'
import NoImage from 'src/assets/images/no-image.svg'
import isNull from 'src/utils/helpers/isNull'

const CreditsItem: React.FC<CreditsItemProps> = ({ profilePath, title, description }) => {
  let cover = (
    <div className='ant-card-cover--no-image'>
      <img
        src={NoImage}
        alt={title}
      />
    </div>
  )
  if (!isNull(profilePath)) {
    cover = (
      <img
        src={`https://image.tmdb.org/t/p/w500${profilePath}`}
        alt={title}
      />
    )
  }

  return (
    <Card cover={cover}>
      <Card.Meta
        title={title}
        description={description}
      />
    </Card>
  )
}

export default CreditsItem
