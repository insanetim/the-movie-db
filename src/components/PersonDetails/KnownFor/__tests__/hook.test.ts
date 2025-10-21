import { renderHook } from '@testing-library/react'
import { IPersonCredit, IPersonDetails } from 'src/interfaces/person.interface'

import useContainer from '../hook'

describe('KnownFor useContainer hook', () => {
  const makeCredit = (
    id: number,
    popularity: number,
    department?: string
  ): IPersonCredit => ({
    department,
    id,
    popularity,
    poster_path: null,
    release_date: '2000-01-01',
    title: `Title ${id}`,
  })

  const makeCredits = (
    cast: IPersonCredit[],
    crew: IPersonCredit[]
  ): IPersonDetails['movie_credits'] => ({ cast, crew })

  describe('Acting department (uses cast)', () => {
    it('should return top 12 cast items sorted by popularity desc', () => {
      const cast = Array.from({ length: 20 }, (_, i) =>
        makeCredit(i + 1, i + 1)
      )
      const credits = makeCredits(cast, [])

      const { result } = renderHook(() =>
        useContainer({ credits, department: 'Acting' })
      )

      // Expect 12 items, highest popularity first
      expect(result.current.sortedItems).toHaveLength(12)
      const popularities = result.current.sortedItems.map(i => i.popularity)
      expect(popularities).toEqual([
        20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9,
      ])
    })

    it('should handle fewer than 12 cast items', () => {
      const cast: IPersonCredit[] = [
        makeCredit(1, 10),
        makeCredit(2, 30),
        makeCredit(3, 20),
      ]
      const credits = makeCredits(cast, [])

      const { result } = renderHook(() =>
        useContainer({ credits, department: 'Acting' })
      )

      expect(result.current.sortedItems).toHaveLength(3)
      expect(result.current.sortedItems.map(i => i.popularity)).toEqual([
        30, 20, 10,
      ])
    })
  })

  describe('Non-Acting department (filters crew by department)', () => {
    it('should filter crew by department and sort by popularity desc', () => {
      const crew: IPersonCredit[] = [
        makeCredit(1, 5, 'Directing'),
        makeCredit(2, 50, 'Writing'),
        makeCredit(3, 25, 'Directing'),
        makeCredit(4, 75, 'Directing'),
      ]
      const credits = makeCredits([], crew)

      const { result } = renderHook(() =>
        useContainer({ credits, department: 'Directing' })
      )

      const ids = result.current.sortedItems.map(i => i.id)
      expect(ids).toEqual([4, 3, 1])
    })

    it('should return empty when no crew matches the department', () => {
      const crew: IPersonCredit[] = [
        makeCredit(1, 10, 'Writing'),
        makeCredit(2, 20, 'Camera'),
      ]
      const credits = makeCredits([], crew)

      const { result } = renderHook(() =>
        useContainer({ credits, department: 'Directing' })
      )

      expect(result.current.sortedItems).toEqual([])
    })
  })

  describe('Edge cases', () => {
    it('should return empty array when both cast and crew are empty', () => {
      const credits = makeCredits([], [])

      const { result } = renderHook(() =>
        useContainer({ credits, department: 'Acting' })
      )

      expect(result.current.sortedItems).toEqual([])
    })
  })
})
