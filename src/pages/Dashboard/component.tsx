import { Helmet } from 'react-helmet'
import SearchInput from 'src/components/Dashboard/SearchInput'
import SearchResult from 'src/components/Dashboard/SearchResult/component'
import Trending from 'src/components/Dashboard/Trending/component'
import { APP_NAME } from 'src/constants'

import useContainer from './hook'

const Dashboard: React.FC = () => {
  const { query } = useContainer()

  return (
    <>
      <Helmet title={APP_NAME} />
      <div className='container'>
        <SearchInput query={query} />
        <div className='top-margin'>
          {query ? <SearchResult query={query} /> : <Trending />}
        </div>
      </div>
    </>
  )
}

export default Dashboard
