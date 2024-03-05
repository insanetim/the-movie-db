import { Button } from 'antd'
import isPresent from 'src/utils/helpers/isPresent'

import useContainer from './hook'
import { PopoverContentProps } from './types'

const PopoverContent: React.FC<PopoverContentProps> = props => {
  const { handleAddToList, handleAddToNewList, lists } = useContainer(props)

  return (
    <>
      <div>
        <Button
          onClick={handleAddToNewList}
          type='link'
        >
          Create new list ...
        </Button>
      </div>
      {isPresent(lists) &&
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
