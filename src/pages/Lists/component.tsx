import { PlusCircleOutlined } from '@ant-design/icons'
import { Typography } from 'antd'
import { Helmet } from 'react-helmet'
import ListsList from 'src/components/Lists/ListsList'
import IconButton from 'src/components/UI/Buttons/IconButton'
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

  let content: JSX.Element
  if (loading) {
    content = <Loading />
  } else if (error) {
    content = <Error error={error} />
  } else if (!lists || lists.results.length === 0) {
    content = <Empty />
  } else {
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
      <div className='container top-margin'>
        <PageTitle>
          <Typography.Title style={{ marginBottom: 0 }}>
            My Lists
          </Typography.Title>
          <IconButton
            data-testid='createListBtn'
            icon={<PlusCircleOutlined />}
            onClick={handleCreateList}
          />
        </PageTitle>
        {content}
      </div>
    </>
  )
}

export default Lists
