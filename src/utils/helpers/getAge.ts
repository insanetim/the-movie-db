import { differenceInYears, format } from 'date-fns'

const getAge = (dateOfBirth: string) => {
  const formatedDate = format(dateOfBirth, 'MMMM d, yyyy')
  const age = differenceInYears(new Date(), dateOfBirth)

  return `${formatedDate} (${age} years old)`
}

export default getAge
