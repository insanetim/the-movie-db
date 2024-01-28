const getIdFromSlug = (slug: string) => {
  return Number(slug.split('-').at(0))
}

export default getIdFromSlug
