import { differenceInYears, format } from 'date-fns'

export const getAge = (birthday: string, deathday?: string) => {
  const formatedDate = format(deathday ? deathday : birthday, 'MMMM d, yyyy')
  const age = differenceInYears(deathday ? deathday : new Date(), birthday)

  return `${formatedDate} (${age} years old)`
}

export const getFormatedDate = (date: string) => {
  return format(date, 'MMMM d, yyyy')
}
