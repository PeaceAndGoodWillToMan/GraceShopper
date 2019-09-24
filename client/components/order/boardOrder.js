import React from 'react'

const BoardOrder = props => {
  return (
    <li>
      Board ID: {props.boardId} Quantity: {props.quantity} Price: {props.price}
    </li>
  )
}

export default BoardOrder
