import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { render } from '@testing-library/react'

import store from 'src/store'
import ListContent from '../component'

describe('ListContent cpmponent', () => {
  it('matches snapshot', () => {
    const mockedMovies = [
      {
        id: 1,
        title: 'test/title',
        overview: 'test/overview',
        poster_path: 'test/poster_path'
      }
    ]
    const { asFragment } = render(
      <Provider store={store}>
        <MemoryRouter>
          <ListContent movies={mockedMovies} />
        </MemoryRouter>
      </Provider>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('matches snapshot without movies', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <MemoryRouter>
          <ListContent />
        </MemoryRouter>
      </Provider>
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
