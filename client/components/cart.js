import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  gotContents,
  fetchDeletedcontent,
  fetchCheckedCartOut,
  retrieveStorage
} from '../store/cart'
import {Link} from 'react-router-dom'
import {fetchedCheckout} from '../store'
import CartItem from './cartItem'
import {stateChange} from './navbar'

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
    let toast = document.getElementById('checkout-toast')
    toast.className = 'show'
    setTimeout(function() {
      toast.className = toast.className.replace('show', '')
    }, 3000)
    retrieveStorage()
    this.props.fetchCheckedCartOut()
    stateChange()
    this.props
      .fetchedCheckout([])
      .then(() => this.props.history.push('/checkout'))
  }

  render() {
    const contents = this.props.contents
    console.log(contents)

    return (
      <div>
        <ul>
          {contents.map(content => (
            <div key={content.id} className="cart">
              <div>
                <Link key={content.id} to={`/boards/${content.id}`}>
                  <p id="boardname">{content.name}</p>
                  <img src={content.imageUrl} height="175" width="175" />
                </Link>
              </div>
              <CartItem content={content} />
              <button
                type="button"
                className="delete_btn"
                onClick={this.handleDeleteClick}
                value={content.id}
              >
                Remove from Cart
              </button>
            </div>
          ))}
        </ul>
        <div>
          {window.localStorage.length ? (
            <button id="chkout" type="button" onClick={this.handleOrderClick}>
              Checkout
            </button>
          ) : null}
        </div>
        <div id="checkout-toast">Thank you for your purchase!</div>
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
