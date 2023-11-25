import { Button } from 'antd'
import { isNotNil } from 'ramda'

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
      {isNotNil(lists) &&
        lists.results.map(list => (
          <div key={list.id}>
            <Button
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
