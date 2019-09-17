import React from 'react'

const ListItem = props => {
  const orderFullfilled = props.order.fullfilled
  const orderId = props.order.id
  return (
    <li>
      {orderId}: {orderFullfilled}
    </li>
  )
}

export default ListItem
