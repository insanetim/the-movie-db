import { MinusCircleOutlined } from '@ant-design/icons'
import MoviesList from 'src/components/Movies/MoviesList'
import Empty from 'src/components/UI/Empty'
import Error from 'src/components/UI/Error'
import Loading from 'src/components/UI/Loading'
import PageTitle from 'src/components/UI/PageTitle'
import isNull from 'src/utils/helpers/isNull'

import useContainer from './hook'

const ListDetails: React.FC = () => {
  const { error, handleListDelete, handleMovieDelete, list, loading } = useContainer()

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

  if (!isNull(list) && list.items.length > 0) {
    content = (
      <MoviesList
        handleMovieDelete={handleMovieDelete}
        movies={list.items}
      />
    )
  }

  return (
    <div className='container'>
      <PageTitle>
        {list?.name} <MinusCircleOutlined onClick={handleListDelete} />
      </PageTitle>
      {content}
    </div>
  )
}

export default ListDetails
