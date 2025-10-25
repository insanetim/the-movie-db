import { disableReactDevTools } from '@fvilers/disable-react-devtools'
import { createRoot } from 'react-dom/client'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import App from 'src/App'

import './assets/styles/styles.scss'
import { ModalsProvider } from './contexts/ModalsProvider'
import StoreProvider from './contexts/StoreProvider'
import ThemeProvider from './contexts/ThemeProvider'

if (process.env.NODE_ENV === 'production') {
  disableReactDevTools()
}

const rootElement = document.getElementById('root')
const root = createRoot(rootElement as HTMLElement)

root.render(
  <StoreProvider>
    <ThemeProvider>
      <ModalsProvider>
        <Router>
          <Routes>
            <Route
              element={<App />}
              path='/*'
            />
          </Routes>
        </Router>
      </ModalsProvider>
    </ThemeProvider>
  </StoreProvider>
)
