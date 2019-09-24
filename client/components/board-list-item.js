import React from 'react'

const ListItem = props => {
  const boardName = props.board.name
  return (
    <li>
      <p>{boardName}</p>
    </li>
  )
}

export default ListItem
