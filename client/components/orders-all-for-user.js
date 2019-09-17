import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getAllOrders} from '../store/order'
import ListItem from './board-single'
import {Link} from 'react-router-dom'

class List extends Component {
  // get all board data to generate list
  componentDidMount() {
    this.props.getData()
  }

  render() {
    return (
      <div>
        <ul>
          {this.props.orders.map(order => (
            <div key={order.id} id="item">
              <Link key={order.id} to={`orders/${order.id}`}>
                <ListItem key={order.id} order={order} />
              </Link>
            </div>
          ))}
        </ul>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  getData: () => {
    dispatch(getAllOrders())
  }
})

const mapStateToProps = state => ({
  orders: state.orders.all
})

const OrderList = connect(mapStateToProps, mapDispatchToProps)(List)

export default OrderList
