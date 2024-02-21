import { differenceInYears, format } from 'date-fns'

const getAge = (date: string) => {
  const formatedDate = format(date, 'MMMM d, yyyy')
  const age = differenceInYears(new Date(), date)

  return `${formatedDate} (${age} years old)`
}

export default getAge
