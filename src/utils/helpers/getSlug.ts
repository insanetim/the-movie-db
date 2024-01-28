import slug from 'slug'

const getSlug = (id: number | string, title: string) => {
  return `${id}-${slug(title)}`
}

export default getSlug
