import React from 'react'
import { Button } from 'antd'

import { useContainer } from './hook'

const PopoverContent = props => {
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
      {lists?.results?.map(list => (
        <div key={list.id}>
          <Button
            type='link'
            onClick={() => handleAddToList(list.id)}
          >
            {list.name}
          </Button>
        </div>
      ))}
    </>
  )
}

export default PopoverContent
