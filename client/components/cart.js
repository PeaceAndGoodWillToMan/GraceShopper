import React, {Component} from 'react'
import {connect} from 'react-redux'
import {gotContents} from '../store/cart'
import {getAllBoards} from '../store'

class Cart extends Component {
  constructor(props) {
    super(props)
    this.handleDeleteClick = this.handleDeleteClick.bind(this)
  }
  componentDidMount() {
    this.props.getCart()
    this.props.getAllBoards()
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
          {}
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
            value={window.localStorage}
          >
            Checkout
          </button>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  getCart: () => {
    dispatch(gotContents())
  },
  getData: () => {
    dispatch(getAllBoards())
  }
})

const mapStateToProps = state => ({
  orders: state.order.all
})

const CartContents = connect(mapStateToProps, mapDispatchToProps)(Cart)
export default CartContents
