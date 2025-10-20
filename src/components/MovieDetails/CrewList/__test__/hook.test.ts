import { renderHook } from '@testing-library/react'
import { IMovieCredit } from 'src/interfaces/movie.interface'

import useContainer from '../hook'
import { CrewListHookProps } from '../types'

// Mock Ramda functions
jest.mock('ramda', () => ({
  groupBy: jest.fn(),
  sort: jest.fn(),
}))

import { groupBy, sort } from 'ramda'

const mockGroupBy = groupBy as jest.MockedFunction<typeof groupBy>
const mockSort = sort as jest.MockedFunction<typeof sort>

// Mock crew data for testing
const mockCrew: IMovieCredit[] = [
  {
    credit_id: '1',
    department: 'Directing',
    id: 1,
    job: 'Director',
    name: 'John Director',
    profile_path: '/path1',
  },
  {
    credit_id: '2',
    department: 'Writing',
    id: 2,
    job: 'Writer',
    name: 'Jane Writer',
    profile_path: '/path2',
  },
  {
    credit_id: '3',
    department: 'Directing',
    id: 3,
    job: 'Assistant Director',
    name: 'Bob Assistant',
    profile_path: '/path3',
  },
  {
    credit_id: '4',
    department: 'Production',
    id: 4,
    job: 'Producer',
    name: 'Alice Producer',
    profile_path: '/path4',
  },
  {
    credit_id: '5',
    department: 'Writing',
    id: 5,
    job: 'Screenplay',
    name: 'Charlie Screenwriter',
    profile_path: '/path5',
  },
]

const emptyCrew: IMovieCredit[] = []

describe('CrewList useContainer hook', () => {
  beforeEach(() => {
    // Reset mocks before each test
    mockGroupBy.mockClear()
    mockSort.mockClear()
  })

  it('should return groupedCrew object', () => {
    const groupedData = {
      Directing: [mockCrew[0], mockCrew[2]],
      Production: [mockCrew[3]],
      Writing: [mockCrew[1], mockCrew[4]],
    }

    mockGroupBy.mockReturnValue(groupedData as never)
    mockSort.mockReturnValue(['Directing', 'Production', 'Writing'])

    const props: CrewListHookProps = {
      crew: mockCrew,
    }

    const { result } = renderHook(() => useContainer(props))

    expect(result.current.groupedCrew).toBeDefined()
    expect(result.current.groupedCrew.groupNames).toEqual([
      'Directing',
      'Production',
      'Writing',
    ])
  })

  it('should group crew by department correctly', () => {
    const groupedData = {
      Directing: [mockCrew[0], mockCrew[2]],
      Production: [mockCrew[3]],
      Writing: [mockCrew[1], mockCrew[4]],
    }

    mockGroupBy.mockReturnValue(groupedData as never)
    mockSort.mockReturnValue(['Directing', 'Production', 'Writing'])

    const props: CrewListHookProps = {
      crew: mockCrew,
    }

    renderHook(() => useContainer(props))

    expect(mockGroupBy).toHaveBeenCalledWith(
      expect.any(Function), // The grouping function that extracts department
      mockCrew
    )

    // Test that the groupBy function would correctly group our mock data
    const groupByFunction = mockGroupBy.mock.calls[0][0]
    expect(groupByFunction(mockCrew[0])).toBe('Directing')
    expect(groupByFunction(mockCrew[1])).toBe('Writing')
    expect(groupByFunction(mockCrew[2])).toBe('Directing')
    expect(groupByFunction(mockCrew[3])).toBe('Production')
    expect(groupByFunction(mockCrew[4])).toBe('Writing')
  })

  it('should sort department names alphabetically using localeCompare', () => {
    const groupedData = {
      Directing: [mockCrew[0], mockCrew[2]], // D comes first in insertion order
      Production: [mockCrew[3]], // P comes second
      Writing: [mockCrew[1], mockCrew[4]], // W comes third
    }

    mockGroupBy.mockReturnValue(groupedData as never)

    let capturedSortFunction: ((a: string, b: string) => number) | undefined

    mockSort.mockImplementation(comparator => {
      capturedSortFunction = comparator
      // Return the sorted array as expected
      return ['Directing', 'Production', 'Writing']
    })

    const props: CrewListHookProps = {
      crew: mockCrew,
    }

    renderHook(() => useContainer(props))

    // Verify the sort function was called with the correct array (insertion order)
    expect(mockSort).toHaveBeenCalledWith(expect.any(Function), [
      'Directing',
      'Production',
      'Writing',
    ])

    // Test the captured sort function
    expect(capturedSortFunction).toBeDefined()
    if (capturedSortFunction) {
      // Test that it sorts alphabetically using localeCompare logic
      expect(capturedSortFunction('Apple', 'Banana')).toBeLessThan(0) // A < B
      expect(capturedSortFunction('Banana', 'Apple')).toBeGreaterThan(0) // B > A
      expect(capturedSortFunction('Cherry', 'Cherry')).toBe(0) // C = C

      // Test with the actual department names from our data
      expect(capturedSortFunction('Directing', 'Production')).toBeLessThan(0) // D < P
      expect(capturedSortFunction('Production', 'Writing')).toBeLessThan(0) // P < W
      expect(capturedSortFunction('Directing', 'Writing')).toBeLessThan(0) // D < W
    }
  })

  it('should handle empty crew array', () => {
    const groupedData = {}
    mockGroupBy.mockReturnValue(groupedData as never)
    mockSort.mockReturnValue([])

    const props: CrewListHookProps = {
      crew: emptyCrew,
    }

    const { result } = renderHook(() => useContainer(props))

    expect(result.current.groupedCrew.groupNames).toEqual([])
    expect(mockGroupBy).toHaveBeenCalledWith(expect.any(Function), [])
    expect(mockSort).toHaveBeenCalledWith(expect.any(Function), [])
  })

  it('should handle crew with missing departments', () => {
    const crewWithMissingDept: IMovieCredit[] = [
      {
        credit_id: '1',
        id: 1,
        name: 'John Doe',
        // department is undefined
      },
      {
        credit_id: '2',
        department: 'Directing',
        id: 2,
        name: 'Jane Director',
      },
    ]

    const groupedData = {
      Directing: [crewWithMissingDept[1]],
      undefined: [crewWithMissingDept[0]],
    }

    mockGroupBy.mockReturnValue(groupedData as never)
    mockSort.mockReturnValue(['Directing', 'undefined'])

    const props: CrewListHookProps = {
      crew: crewWithMissingDept,
    }

    const { result } = renderHook(() => useContainer(props))

    expect(result.current.groupedCrew.groupNames).toEqual([
      'Directing',
      'undefined',
    ])
    expect(mockGroupBy).toHaveBeenCalledWith(
      expect.any(Function),
      crewWithMissingDept
    )
  })

  it('should handle crew with single department', () => {
    const singleDeptCrew: IMovieCredit[] = [
      {
        credit_id: '1',
        department: 'Directing',
        id: 1,
        job: 'Director',
        name: 'John Director',
      },
      {
        credit_id: '2',
        department: 'Directing',
        id: 2,
        job: 'Assistant Director',
        name: 'Jane Assistant',
      },
    ]

    const groupedData = {
      Directing: singleDeptCrew,
    }

    mockGroupBy.mockReturnValue(groupedData as never)
    mockSort.mockReturnValue(['Directing'])

    const props: CrewListHookProps = {
      crew: singleDeptCrew,
    }

    const { result } = renderHook(() => useContainer(props))

    expect(result.current.groupedCrew.groupNames).toEqual(['Directing'])
    expect(result.current.groupedCrew.Directing).toEqual(singleDeptCrew)
  })

  it('should handle crew with many different departments', () => {
    const manyDeptCrew: IMovieCredit[] = [
      {
        credit_id: '1',
        department: 'Camera',
        id: 1,
        name: 'Camera Person',
      },
      {
        credit_id: '2',
        department: 'Sound',
        id: 2,
        name: 'Sound Designer',
      },
      {
        credit_id: '3',
        department: 'Editing',
        id: 3,
        name: 'Editor',
      },
      {
        credit_id: '4',
        department: 'Art',
        id: 4,
        name: 'Art Director',
      },
      {
        credit_id: '5',
        department: 'Costume & Make-Up',
        id: 5,
        name: 'Costume Designer',
      },
    ]

    const groupedData = {
      Art: [manyDeptCrew[3]],
      Camera: [manyDeptCrew[0]],
      'Costume & Make-Up': [manyDeptCrew[4]],
      Editing: [manyDeptCrew[2]],
      Sound: [manyDeptCrew[1]],
    }

    mockGroupBy.mockReturnValue(groupedData as never)
    mockSort.mockReturnValue([
      'Art',
      'Camera',
      'Costume & Make-Up',
      'Editing',
      'Sound',
    ])

    const props: CrewListHookProps = {
      crew: manyDeptCrew,
    }

    const { result } = renderHook(() => useContainer(props))

    expect(result.current.groupedCrew.groupNames).toEqual([
      'Art',
      'Camera',
      'Costume & Make-Up',
      'Editing',
      'Sound',
    ])
  })

  it('should handle crew with special characters in department names', () => {
    const specialDeptCrew: IMovieCredit[] = [
      {
        credit_id: '1',
        department: 'Visual Effects',
        id: 1,
        name: 'VFX Artist',
      },
      {
        credit_id: '2',
        department: 'Costume & Make-Up',
        id: 2,
        name: 'Makeup Artist',
      },
    ]

    const groupedData = {
      'Costume & Make-Up': [specialDeptCrew[1]],
      'Visual Effects': [specialDeptCrew[0]],
    }

    mockGroupBy.mockReturnValue(groupedData as never)
    mockSort.mockReturnValue(['Costume & Make-Up', 'Visual Effects'])

    const props: CrewListHookProps = {
      crew: specialDeptCrew,
    }

    const { result } = renderHook(() => useContainer(props))

    expect(result.current.groupedCrew.groupNames).toEqual([
      'Costume & Make-Up',
      'Visual Effects',
    ])
  })

  it('should handle large crew arrays', () => {
    const largeCrew: IMovieCredit[] = Array.from({ length: 100 }, (_, i) => ({
      credit_id: `${i}`,
      department:
        i % 3 === 0 ? 'Directing' : i % 3 === 1 ? 'Writing' : 'Production',
      id: i,
      name: `Person ${i}`,
    }))

    const groupedData = {
      Directing: largeCrew.filter(c => c.department === 'Directing'),
      Production: largeCrew.filter(c => c.department === 'Production'),
      Writing: largeCrew.filter(c => c.department === 'Writing'),
    }

    mockGroupBy.mockReturnValue(groupedData as never)
    mockSort.mockReturnValue(['Directing', 'Production', 'Writing'])

    const props: CrewListHookProps = {
      crew: largeCrew,
    }

    const { result } = renderHook(() => useContainer(props))

    expect(result.current.groupedCrew.groupNames).toEqual([
      'Directing',
      'Production',
      'Writing',
    ])
    expect(mockGroupBy).toHaveBeenCalledWith(expect.any(Function), largeCrew)
  })
})
