import { MinusCircleOutlined, DeleteOutlined } from '@ant-design/icons'

import Loading from 'src/components/UI/Loading'
import Error from 'src/components/UI/Error'
import MoviesList from 'src/components/Movies/MoviesList'
import PageTitle from 'src/components/UI/PageTitle'
import useContainer from './hook'

const ListDetails = () => {
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

  return (
    <div className='container'>
      <PageTitle>
        {list.name} <MinusCircleOutlined onClick={handleListDelete} />
      </PageTitle>
      <MoviesList
        movies={list.items}
        actions={[
          <DeleteOutlined
            key='delete'
            onClick={handleMovieDelete}
          />
        ]}
      />
    </div>
  )
}

export default ListDetails
