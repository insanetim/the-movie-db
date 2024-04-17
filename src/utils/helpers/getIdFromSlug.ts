const getIdFromSlug = (slug: string) => {
  const [idString] = slug.split('-')
  return Number(idString)
}

export default getIdFromSlug
