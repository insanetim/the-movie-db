import React from 'react'
import { Route, Routes } from 'react-router-dom'

import StubsRoutes from './components/stubs'

const App = () => (
  <Routes>
    <Route
      path='/stubs/*'
      element={<StubsRoutes />}
    />
  </Routes>
)

export default App
