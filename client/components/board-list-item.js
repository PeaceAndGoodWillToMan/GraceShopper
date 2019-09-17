import React from 'react'

const ListItem = props => {
  const boardName = props.board.name
  return <li>{boardName}</li>
}

export default ListItem
