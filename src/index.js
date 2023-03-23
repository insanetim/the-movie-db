import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import App from './App'
import store from './store'
import './assets/styles/styles.scss'

const rootElement = document.getElementById('root')
const root = createRoot(rootElement)

root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
)
