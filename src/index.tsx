import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import App from 'src/App'
import { persistor, store } from 'src/store'

import './assets/styles/styles.scss'

const rootElement = document.getElementById('root')
const root = createRoot(rootElement as HTMLElement)

root.render(
  <Provider store={store}>
    <PersistGate
      loading={null}
      persistor={persistor}
    >
      <BrowserRouter>
        <Routes>
          <Route
            element={<App />}
            path='/*'
          />
        </Routes>
      </BrowserRouter>
    </PersistGate>
  </Provider>
)
