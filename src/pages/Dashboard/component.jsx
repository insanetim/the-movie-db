import SearchInput from 'src/components/Dashboard/SearchInput'
import SearchResult from 'src/components/Dashboard/SearchResult'
import Trending from 'src/components/Dashboard/Trending'
import useContainer from './hook'

const Dashboard = () => {
  const { searchQuery } = useContainer()

  return (
    <div className='container'>
      <SearchInput searchQuery={searchQuery} />
      <div className='top-margin'>
        {searchQuery && <SearchResult searchQuery={searchQuery} />} {!searchQuery && <Trending />}
      </div>
    </div>
  )
}

export default Dashboard
