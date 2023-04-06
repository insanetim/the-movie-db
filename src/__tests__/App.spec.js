/* eslint-disable react/prop-types */
import { Suspense } from 'react'
import { render } from '@testing-library/react'

import App, { Dashboard, Login, Lists, Watchlist, Favorites, ListDetail, MovieDetail } from 'src/App'
import Wrapper from 'src/__mocks__/wrapperMock'

describe('App component', () => {
  const WrapperWithSuspense = ({ children }) => (
    <Suspense fallback={null}>
      <Wrapper>{children}</Wrapper>
    </Suspense>
  )

  it('renders Login', () => {
    const { asFragment } = render(<Login />, { wrapper: WrapperWithSuspense })

    expect(asFragment()).toMatchSnapshot()
  })

  it('renders Dashboard', () => {
    const { asFragment } = render(<Dashboard />, { wrapper: WrapperWithSuspense })

    expect(asFragment()).toMatchSnapshot()
  })

  it('renders Lists', () => {
    const { asFragment } = render(<Lists />, { wrapper: WrapperWithSuspense })

    expect(asFragment()).toMatchSnapshot()
  })

  it('renders Watchlist', () => {
    const { asFragment } = render(<Watchlist />, { wrapper: WrapperWithSuspense })

    expect(asFragment()).toMatchSnapshot()
  })

  it('renders Favorites', () => {
    const { asFragment } = render(<Favorites />, { wrapper: WrapperWithSuspense })

    expect(asFragment()).toMatchSnapshot()
  })

  it('renders ListDetails', () => {
    const { asFragment } = render(<ListDetail />, { wrapper: WrapperWithSuspense })

    expect(asFragment()).toMatchSnapshot()
  })

  it('renders Movie', () => {
    const { asFragment } = render(<MovieDetail />, { wrapper: WrapperWithSuspense })

    expect(asFragment()).toMatchSnapshot()
  })

  it('matches snapshot', () => {
    const { asFragment } = render(<App />, { wrapper: Wrapper })

    expect(asFragment()).toMatchSnapshot()
  })
})
