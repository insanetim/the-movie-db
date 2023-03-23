import DashboardSearchInput from 'src/components/Dashboard/DashboardSearchInput'
import DashboardSearchResult from 'src/components/Dashboard/DashboardSearchResult'
import DashboardTrending from 'src/components/Dashboard/DashboardTrending'
import useContainer from './hook'

const Dashboard = () => {
  const { searchQuery } = useContainer()

  return (
    <>
      <DashboardSearchInput searchQuery={searchQuery} />
      <div className='top-margin'>
        {searchQuery && <DashboardSearchResult searchQuery={searchQuery} />} {!searchQuery && <DashboardTrending />}
      </div>
    </>
  )
}

export default Dashboard
