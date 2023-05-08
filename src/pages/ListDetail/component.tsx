import { MinusCircleOutlined } from '@ant-design/icons'

import isNull from 'src/utils/helpers/isNull'
import Loading from 'src/components/UI/Loading'
import Error from 'src/components/UI/Error'
import Empty from 'src/components/UI/Empty'
import PageTitle from 'src/components/UI/PageTitle'
import MoviesList from 'src/components/Movies/MoviesList'
import useContainer from './hook'

const ListDetails: React.FC = () => {
  const { list, loading, error, handleListDelete, handleMovieDelete } = useContainer()

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
        movies={list.items}
        handleMovieDelete={handleMovieDelete}
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
