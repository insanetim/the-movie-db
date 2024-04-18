import { MinusCircleOutlined } from '@ant-design/icons'
import { Typography } from 'antd'
import { Helmet } from 'react-helmet'
import MoviesList from 'src/components/Movies/MoviesList'
import IconButton from 'src/components/UI/Buttons/IconButton'
import Empty from 'src/components/UI/Empty'
import Error from 'src/components/UI/Error'
import Loading from 'src/components/UI/Loading'
import PageTitle from 'src/components/UI/PageTitle'
import Pagination from 'src/components/UI/Pagination'
import metaTitle from 'src/utils/helpers/metaTitle'

import useContainer from './hook'

const ListDetails: React.FC = () => {
  const {
    error,
    handleListDelete,
    handleMovieDelete,
    handlePagination,
    list,
    loading,
  } = useContainer()

  if (loading) {
    return (
      <div className='container top-margin'>
        <Loading />
      </div>
    )
  } else if (error) {
    return (
      <div className='container top-margin'>
        <Error error={error} />
      </div>
    )
  }

  let content: JSX.Element
  if (!list || list.items.length === 0) {
    content = <Empty />
  } else {
    content = (
      <>
        <MoviesList
          handleMovieDelete={handleMovieDelete}
          movies={list.items}
        />
        {list.total_pages > 1 && (
          <Pagination
            current={list.page}
            onChange={handlePagination}
            pageSize={20}
            total={list.total_results}
          />
        )}
      </>
    )
  }

  const title = list?.name || 'My List'

  return (
    <>
      <Helmet title={metaTitle(title)} />
      <div className='container top-margin'>
        <PageTitle>
          <Typography.Title style={{ marginBottom: 0 }}>
            {title}
          </Typography.Title>
          <IconButton
            data-testid='deleteListBtn'
            icon={<MinusCircleOutlined />}
            onClick={handleListDelete}
          />
        </PageTitle>
        {content}
      </div>
    </>
  )
}

export default ListDetails
