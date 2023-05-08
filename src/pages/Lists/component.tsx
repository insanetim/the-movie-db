import { PlusCircleOutlined } from '@ant-design/icons'

import isNull from 'src/utils/helpers/isNull'
import Loading from 'src/components/UI/Loading'
import Error from 'src/components/UI/Error'
import Empty from 'src/components/UI/Empty/component'
import PageTitle from 'src/components/UI/PageTitle'
import Pagination from 'src/components/UI/Pagination'
import ListsList from 'src/components/Lists/ListsList'
import useContainer from './hook'

const Lists: React.FC = () => {
  const { lists, loading, error, handlePagination, handleCreateList } = useContainer()

  let content = <Empty />

  if (loading) {
    content = (
      <div className='top-margin'>
        <Loading />
      </div>
    )
  }
  if (error) {
    content = <Error error={error} />
  }
  if (!isNull(lists) && lists.results.length > 0) {
    content = (
      <>
        <ListsList lists={lists.results} />
        {lists.total_pages > 1 && (
          <Pagination
            current={lists.page}
            pageSize={20}
            total={lists.total_results}
            onChange={handlePagination}
          />
        )}
      </>
    )
  }

  return (
    <div className='container'>
      <PageTitle>
        My Lists <PlusCircleOutlined onClick={handleCreateList} />
      </PageTitle>
      {content}
    </div>
  )
}

export default Lists
