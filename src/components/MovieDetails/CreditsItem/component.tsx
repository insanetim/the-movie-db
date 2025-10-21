import { Card } from 'antd'
import NoImage from 'src/assets/images/no-image.svg'

import useContainer from './hook'
import { CreditsItemProps } from './types'

const CreditsItem: React.FC<CreditsItemProps> = ({
  description,
  id,
  profilePath,
  title,
}) => {
  const { handleNavigateToPerson } = useContainer({ id, title })

  let cover: JSX.Element
  if (profilePath) {
    cover = (
      <img
        alt={title}
        src={`https://image.tmdb.org/t/p/w500${profilePath}`}
      />
    )
  } else {
    cover = (
      <div className='ant-card-cover--no-image'>
        <img
          alt={title}
          src={NoImage}
        />
      </div>
    )
  }

  return (
    <Card
      cover={cover}
      hoverable
      onClick={handleNavigateToPerson}
    >
      <Card.Meta
        description={description}
        title={title}
      />
    </Card>
  )
}

export default CreditsItem
