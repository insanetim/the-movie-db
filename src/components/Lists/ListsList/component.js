import PropTypes from 'prop-types'
import { Row, Col } from 'antd'

import Pagination from 'src/components/Pagination'
import Empty from 'src/components/Empty'
import ListItem from '../ListItem'
import useContainer from './hook'

const ListsList = ({ lists }) => {
  const { handlePaginationChange } = useContainer()

  if (!lists.results.length) {
    return <Empty description='No results' />
  }

  return (
    <>
      <Row justify='center'>
        <Col span={20}>
          <Row
            gutter={{
              xs: 8,
              sm: 16,
              md: 24,
              lg: 32
            }}
          >
            {lists.results.map(list => (
              <ListItem
                key={list.id}
                list={list}
              />
            ))}
          </Row>
        </Col>
      </Row>
      {lists.total_pages > 1 && (
        <Pagination
          current={lists.page}
          pageSize={20}
          total={lists.total_results}
          onChange={handlePaginationChange}
        />
      )}
    </>
  )
}

ListsList.propTypes = {
  lists: PropTypes.shape({
    page: PropTypes.number,
    results: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        description: PropTypes.string
      })
    ),
    total_pages: PropTypes.number,
    total_results: PropTypes.number
  })
}

ListsList.defaultProps = {
  lists: {}
}

export default ListsList
