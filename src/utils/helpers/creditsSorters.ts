import { compareAsc } from 'date-fns'
import { ICredit } from 'src/pages/Credits/types'

const releaseDateSorter = (a: ICredit, b: ICredit) =>
  compareAsc(a.releaseDate, b.releaseDate)

const titleSorter = (a: ICredit, b: ICredit) => a.title.localeCompare(b.title)

export { releaseDateSorter, titleSorter }
