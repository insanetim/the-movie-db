import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithWrapper } from 'src/utils/testHelpers/renderWithWrapper'

import CreditsItem from '../component'
import { CreditsItemProps } from '../types'

const mockedHook = {
  handleNavigateToPerson: jest.fn(),
}
jest.mock('../hook', () => jest.fn(() => mockedHook))

describe('CreditsItem component', () => {
  const props: CreditsItemProps = {
    description: 'test/description',
    id: 1234,
    profilePath: 'test/image',
    title: 'test/title',
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders profile image with title and description', () => {
    renderWithWrapper(<CreditsItem {...props} />)

    const image = screen.getByRole('img', {
      name: props.title,
    }) as HTMLImageElement

    expect(image.src).toContain(
      `https://image.tmdb.org/t/p/w500${props.profilePath}`
    )
    expect(screen.getByText(props.title)).toBeInTheDocument()
    expect(screen.getByText(props.description!)).toBeInTheDocument()
  })

  it('uses fallback image when profilePath missing', () => {
    renderWithWrapper(
      <CreditsItem
        {...props}
        profilePath={undefined}
      />
    )

    const fallbackWrapper = document.querySelector('.ant-card-cover--no-image')

    expect(fallbackWrapper).toBeInTheDocument()
    expect(fallbackWrapper?.querySelector('img')?.getAttribute('alt')).toBe(
      props.title
    )
  })

  it('navigates to person when card clicked', async () => {
    const user = userEvent.setup()

    renderWithWrapper(<CreditsItem {...props} />)

    const card = document.querySelector('.ant-card') as HTMLElement

    expect(card).toBeInTheDocument()
    await user.click(card)

    expect(mockedHook.handleNavigateToPerson).toHaveBeenCalled()
  })
})
