import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  gotContents,
  fetchDeletedcontent,
  fetchCheckedCartOut
} from '../store/cart'
import {Link} from 'react-router-dom'
import {fetchedCheckout} from '../store'

class Cart extends Component {
  constructor(props) {
    super(props)
    this.handleDeleteClick = this.handleDeleteClick.bind(this)
    this.handleOrderClick = this.handleOrderClick.bind(this)
  }
  componentDidMount() {
    this.props.getCart()
  }

  handleDeleteClick(event) {
    event.preventDefault()
    this.props.fetchDeletedcontent(event.target.value)
  }

  handleOrderClick() {
    event.preventDefault()
    this.props.fetchedCheckout(this.props.contents)
    this.props.fetchCheckedCartOut()
  }

  render() {
    const contents = this.props.contents

    return (
      <div className="cartlist">
        <ul>
          {contents.map(content => (
            <div key={content.id} id="item">
              <Link key={content.id} to={`/boards/${content.id}`}>
                <img src={content.imageUrl} height="100" width="100" />
                {content.name}
              </Link>
              <input type="number" min="1" name="qty" />
              <div>
                <p>qty: {content.quantity}</p>
                <p>price: {content.price}</p>
              </div>
              <button type="button" onClick={this.handleDeleteClick}>
                Remove from Cart
              </button>
            </div>
          ))}
        </ul>
        <div>
          <button
            type="button"
            onClick={this.handleOrderClick}
            value={contents}
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
  fetchDeletedcontent: id => dispatch(fetchDeletedcontent(id)),
  fetchedCheckout: order => dispatch(fetchedCheckout(order)),
  fetchCheckedCartOut: () => dispatch(fetchCheckedCartOut())
})

const mapStateToProps = state => ({
  contents: state.cart.contents
})

const CartContents = connect(mapStateToProps, mapDispatchToProps)(Cart)
export default CartContents
