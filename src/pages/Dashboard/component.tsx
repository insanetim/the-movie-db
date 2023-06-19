import SearchInput from 'src/components/Dashboard/SearchInput'
import SearchResult from 'src/components/Dashboard/SearchResult/component'
import Trending from 'src/components/Dashboard/Trending/component'

import useContainer from './hook'

const Dashboard: React.FC = () => {
  const { query } = useContainer()

  return (
    <div className='container'>
      <SearchInput query={query} />
      <div className='top-margin'>
        {!query && <Trending />}
        {query && <SearchResult query={query} />}
      </div>
    </div>
  )
}

export default Dashboard
