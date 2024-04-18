import { Col, Row, Typography } from 'antd'
import MovieItem from 'src/components/Movies/MovieItem'

import useContainer from './hook'
import { KnownForProps } from './types'

const KnownFor: React.FC<KnownForProps> = ({ credits, department }) => {
  const { sortedItems } = useContainer({ credits, department })

  return (
    <>
      <Col
        className='top-margin'
        span={24}
      >
        <Typography.Title level={2}>Known For</Typography.Title>
      </Col>
      <Col span={24}>
        <Row gutter={[24, 16]}>
          {sortedItems.map(item => {
            return (
              <Col
                key={item.id}
                lg={8}
                md={8}
                sm={12}
                span={24}
                xl={6}
              >
                <MovieItem
                  id={item.id}
                  posterPath={item.poster_path}
                  title={item.title}
                />
              </Col>
            )
          })}
        </Row>
      </Col>
    </>
  )
}

export default KnownFor
