import { isEmpty } from 'ramda'
import { Helmet } from 'react-helmet'
import SearchInput from 'src/components/Dashboard/SearchInput'
import SearchResult from 'src/components/Dashboard/SearchResult/component'
import Trending from 'src/components/Dashboard/Trending/component'
import { APP_NAME } from 'src/constants/app'

import useContainer from './hook'

const Dashboard: React.FC = () => {
  const { query } = useContainer()

  return (
    <>
      <Helmet title={APP_NAME} />
      <div className='container'>
        <SearchInput query={query} />
        <div className='top-margin'>
          {isEmpty(query) && <Trending />}
          {query && <SearchResult query={query} />}
        </div>
      </div>
    </>
  )
}

export default Dashboard
