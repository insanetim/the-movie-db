import { Button } from 'antd'

import useContainer from './hook'
import { PopoverContentProps } from './types'

const PopoverContent: React.FC<PopoverContentProps> = props => {
  const { handleAddToList, handleOpenCreateListModal, lists } =
    useContainer(props)

  return (
    <>
      <div>
        <Button
          onClick={handleOpenCreateListModal}
          type='link'
        >
          Create new list ...
        </Button>
      </div>
      {lists &&
        lists.results.map(list => (
          <div key={list.id}>
            <Button
              onClick={() =>
                handleAddToList({
                  listId: list.id,
                  listName: list.name,
                })
              }
              type='link'
            >
              {list.name}
            </Button>
          </div>
        ))}
    </>
  )
}

export default PopoverContent
