import slug from 'slug'

const getSlug = (id: number | string, title: string) => `${id}-${slug(title)}`

export default getSlug
