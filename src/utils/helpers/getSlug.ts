import slug from 'slug'

const getSlugFromTitle = (id: number | string, title: string) =>
  `${id}-${slug(title)}`

export default getSlugFromTitle
