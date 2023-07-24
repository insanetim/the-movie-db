import { PlusCircleOutlined } from '@ant-design/icons'
import { Helmet } from 'react-helmet'
import ListsList from 'src/components/Lists/ListsList'
import Empty from 'src/components/UI/Empty/component'
import Error from 'src/components/UI/Error'
import Loading from 'src/components/UI/Loading'
import PageTitle from 'src/components/UI/PageTitle'
import Pagination from 'src/components/UI/Pagination'
import isNull from 'src/utils/helpers/isNull'
import metaTitle from 'src/utils/helpers/metaTitle'

import useContainer from './hook'

const Lists: React.FC = () => {
  const { error, handleCreateList, handlePagination, lists, loading } = useContainer()

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
            onChange={handlePagination}
            pageSize={20}
            total={lists.total_results}
          />
        )}
      </>
    )
  }

  return (
    <>
      <Helmet title={metaTitle('My Lists')} />
      <div className='container'>
        <PageTitle>
          My Lists <PlusCircleOutlined onClick={handleCreateList} />
        </PageTitle>
        {content}
      </div>
    </>
  )
}

export default Lists
