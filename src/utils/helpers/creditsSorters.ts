import { compareAsc } from 'date-fns'
import { ICredit } from 'src/pages/Credits/types'

const releaseDateSorter = (a: ICredit, b: ICredit): number =>
  compareAsc(a.releaseDate, b.releaseDate)

const titleSorter = (a: ICredit, b: ICredit): number =>
  a.title.localeCompare(b.title)

export { releaseDateSorter, titleSorter }
