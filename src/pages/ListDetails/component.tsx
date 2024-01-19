import { MinusCircleOutlined } from '@ant-design/icons'
import { Typography } from 'antd'
import { isEmpty, isNotNil } from 'ramda'
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
  }

  if (error) {
    return (
      <div className='container top-margin'>
        <Error error={error} />
      </div>
    )
  }

  let content = <Empty />

  if (isNotNil(list) && !isEmpty(list.items)) {
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

  return (
    <>
      <Helmet title={metaTitle(list?.name ?? 'My List')} />
      <div className='container top-margin'>
        <PageTitle>
          <Typography.Title style={{ marginBottom: 0 }}>
            {list?.name ?? 'My List'}
          </Typography.Title>
          <IconButton
            data-testid='deleteListBtn'
            handleClick={handleListDelete}
            icon={<MinusCircleOutlined />}
          />
        </PageTitle>
        {content}
      </div>
    </>
  )
}

export default ListDetails
