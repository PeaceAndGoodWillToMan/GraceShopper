import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getAllOrders} from '../store/board'
import ListItem from './board-list-item'
import {Link} from 'react-router-dom'

class Cart extends Component {
  componentDidMount() {
    this.props.getData()
  }

  handleDeleteClick(event) {
    event.preventDefault()
    this.props.fetchDeletedBoard(event.target.value)
  }

  render() {
    return (
      <div className="orderlist">
        <ul>
          {/* {this.props.orders.map(order => (
            <div key={order.id} id="item">
                <Link key={order.id} to={`orders/${order.id}`}>
                {order.}
                <img src={order.imageUrl} height="100" width="100" />
                </Link> */}
          <input type="number" min="1" name="qty" value={this.props.quantity} />
          <button type="button" onClick={this.handleDeleteClick}>
            Remove from Cart
          </button>
          {/* </div> */}
          {/* ))} */}
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
  orders: state.order.all
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
