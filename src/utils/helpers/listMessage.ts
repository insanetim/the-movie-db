type ListMessageProps = {
  listName: string
  movieTitle: string
  type: 'add' | 'remove'
}

const listMessage = ({ listName, movieTitle, type }: ListMessageProps) =>
  `${movieTitle} ${type === 'add' ? 'added to' : 'removed from'} ${listName}`

export default listMessage
