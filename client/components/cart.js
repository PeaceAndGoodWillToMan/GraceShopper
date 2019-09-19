import React, {Component} from 'react'
import {connect} from 'react-redux'
import {gotContents} from '../store/cart'
import {getAllcontents} from '../store'
import {Link} from 'react-router-dom'

class Cart extends Component {
  constructor(props) {
    super(props)
    this.handleDeleteClick = this.handleDeleteClick.bind(this)
  }
  componentDidMount() {
    this.props.getCart()
  }

  handleDeleteClick(event) {
    event.preventDefault()
    this.props.fetchDeletedcontent(event.target.value)
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.fetchNewOrder(event.target.value)
  }

  render() {
    const contents = this.props.contents

    return (
      <div className="cartlist">
        <ul>
          {contents.map(content => (
            <div key={content.id} id="item">
              <Link key={content.id} to={`contents/${content.id}`}>
                <img src={content.imageUrl} height="100" width="100" />
                {content.name}
              </Link>
              <input type="number" min="1" name="qty" />
              <div>
                <p>qty: {content.quantity}</p>
                <p>price: {content.price}</p>
              </div>
              <button
                type="button"
                onClick={this.handleDeleteClick}
                value="Need to put in the variable"
              >
                Remove from Cart
              </button>
            </div>
          ))}
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
  }
})

const mapStateToProps = state => ({
  contents: state.cart.contents
})

const CartContents = connect(mapStateToProps, mapDispatchToProps)(Cart)
export default CartContents
