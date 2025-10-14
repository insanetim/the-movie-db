import { disableReactDevTools } from '@fvilers/disable-react-devtools'
import { createRoot } from 'react-dom/client'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import App from 'src/App'

import './assets/styles/styles.scss'
import StoreProvider from './contexts/StoreProvider'

if (process.env.NODE_ENV === 'production') {
  disableReactDevTools()
}

const rootElement = document.getElementById('root')
const root = createRoot(rootElement as HTMLElement)

root.render(
  <StoreProvider>
    <Router>
      <Routes>
        <Route
          element={<App />}
          path='/*'
        />
      </Routes>
    </Router>
  </StoreProvider>
)
