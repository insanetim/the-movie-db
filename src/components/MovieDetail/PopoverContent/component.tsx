import { Button } from 'antd'
import isNull from 'src/utils/helpers/isNull'

import type { PopoverContentProps } from './types'

import useContainer from './hook'

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
      {!isNull(lists) &&
        lists.results.map(list => (
          <div key={list.id}>
            <Button
              data-testid='addToListButton'
              onClick={() => handleAddToList(list.id)}
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
