import { render } from '@testing-library/react'
import { Suspense } from 'react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'

import App, { Dashboard, Login, Lists, Watchlist, Favorites, ListDetails, Movie } from 'src/App'
import store from 'src/store'

describe('App component', () => {
  const wrapper = ({ children }) => (
    <Suspense fallback={null}>
      <Provider store={store}>
        <MemoryRouter>{children}</MemoryRouter>
      </Provider>
    </Suspense>
  )

  it('renders Login', () => {
    const { asFragment } = render(<Login />, { wrapper })

    expect(asFragment()).toMatchSnapshot()
  })

  it('renders Dashboard', () => {
    const { asFragment } = render(<Dashboard />, { wrapper })

    expect(asFragment()).toMatchSnapshot()
  })

  it('renders Lists', () => {
    const { asFragment } = render(<Lists />, { wrapper })

    expect(asFragment()).toMatchSnapshot()
  })

  it('renders Watchlist', () => {
    const { asFragment } = render(<Watchlist />, { wrapper })

    expect(asFragment()).toMatchSnapshot()
  })

  it('renders Favorites', () => {
    const { asFragment } = render(<Favorites />, { wrapper })

    expect(asFragment()).toMatchSnapshot()
  })

  it('renders ListDetails', () => {
    const { asFragment } = render(<ListDetails />, { wrapper })

    expect(asFragment()).toMatchSnapshot()
  })

  it('renders Movie', () => {
    const { asFragment } = render(<Movie />, { wrapper })

    expect(asFragment()).toMatchSnapshot()
  })

  it('matches snapshot', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
