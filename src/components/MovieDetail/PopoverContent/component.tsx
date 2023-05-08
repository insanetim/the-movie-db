import { Button } from 'antd'

import type { PopoverContentProps } from './types'
import isNull from 'src/utils/helpers/isNull'
import useContainer from './hook'

const PopoverContent: React.FC<PopoverContentProps> = props => {
  const { lists, handleAddToNewList, handleAddToList } = useContainer(props)

  return (
    <>
      <div>
        <Button
          type='link'
          onClick={handleAddToNewList}
        >
          Create new list ...
        </Button>
      </div>
      {!isNull(lists) &&
        lists.results.map(list => (
          <div key={list.id}>
            <Button
              type='link'
              onClick={() => handleAddToList(list.id)}
              data-testid='addToListButton'
            >
              {list.name}
            </Button>
          </div>
        ))}
    </>
  )
}

export default PopoverContent
