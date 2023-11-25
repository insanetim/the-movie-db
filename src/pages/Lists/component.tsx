import { PlusCircleOutlined } from '@ant-design/icons'
import { isEmpty, isNotNil } from 'ramda'
import { Helmet } from 'react-helmet'
import ListsList from 'src/components/Lists/ListsList'
import Empty from 'src/components/UI/Empty/component'
import Error from 'src/components/UI/Error'
import Loading from 'src/components/UI/Loading'
import PageTitle from 'src/components/UI/PageTitle'
import Pagination from 'src/components/UI/Pagination'
import metaTitle from 'src/utils/helpers/metaTitle'

import useContainer from './hook'

const Lists: React.FC = () => {
  const { error, handleCreateList, handlePagination, lists, loading } =
    useContainer()

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
  if (isNotNil(lists) && !isEmpty(lists.results)) {
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
          My Lists{' '}
          <PlusCircleOutlined
            data-testid='createListBtn'
            onClick={handleCreateList}
          />
        </PageTitle>
        {content}
      </div>
    </>
  )
}

export default Lists
