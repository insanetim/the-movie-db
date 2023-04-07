import { PlusCircleOutlined } from '@ant-design/icons'

import ListsList from 'src/components/Lists/ListsList'
import Loading from 'src/components/UI/Loading'
import Error from 'src/components/UI/Error'
import PageTitle from 'src/components/UI/PageTitle'
import useContainer from './hook'

const Lists = () => {
  const { lists, loading, error, handleClick } = useContainer()

  return (
    <div className='container'>
      <PageTitle>
        My Lists <PlusCircleOutlined onClick={handleClick} />
      </PageTitle>
      {loading && (
        <div className='top-margin'>
          <Loading />
        </div>
      )}
      {error && <Error error={error} />}
      {!loading && !error && <ListsList lists={lists} />}
    </div>
  )
}

export default Lists
