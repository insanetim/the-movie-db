import React from 'react'

import DashboardSearchInput from 'src/components/Dashboard/DashboardSearchInput'
import DashboardSearchResult from 'src/components/Dashboard/DashboardSearchResult'
import DashboardTrending from 'src/components/Dashboard/DashboardTrending'
import { useContainer } from './hook'

const Dashboard = () => {
  const { searchQuery, searchResult, trending } = useContainer()

  return (
    <>
      <DashboardSearchInput />
      <div className='top-margin'>
        {searchQuery ? <DashboardSearchResult movies={searchResult} /> : <DashboardTrending movies={trending} />}
      </div>
    </>
  )
}

export default Dashboard
