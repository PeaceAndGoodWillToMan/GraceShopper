import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getAllOrders} from '../store/board'
import ListItem from './board-list-item'
import {Link} from 'react-router-dom'

class Cart extends Component {
  constructor(props) {
    super(props)
    this.handleDeleteClick = this.handleDeleteClick.bind(this)
  }
  componentDidMount() {
    this.props.getData()
  }

  handleDeleteClick(event) {
    event.preventDefault()
    this.props.fetchDeletedBoard(event.target.value)
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.fetchNewOrder(event.target.value)
  }

  render() {
    return (
      <div className="cartlist">
        <ul>
          <input type="number" min="1" name="qty" value={this.props.quantity} />
          <button
            type="button"
            onClick={this.handleDeleteClick}
            value="Need to put in the variable"
          >
            Remove from Cart
          </button>
        </ul>
        <div>
          <button
            type="submit"
            onSubmit={this.handleSubmit}
            value="Need to put in the variable"
          >
            Checkout
          </button>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  getData: () => {
    dispatch(gotContents())
  }
})

const mapStateToProps = state => ({
  orders: state.order.all
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
