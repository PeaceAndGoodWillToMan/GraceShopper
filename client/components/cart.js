import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  gotContents,
  fetchDeletedcontent,
  fetchCheckedCartOut
} from '../store/cart'
import {Link} from 'react-router-dom'
import {fetchedCheckout} from '../store'
import CartItem from './cartItem'
import {stateChange} from './navbar'

const myStorage = window.localStorage

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
    let arr = []
    for (const key in myStorage) {
      if (myStorage.hasOwnProperty(key)) {
        arr.push({
          id: JSON.parse(key).id,
          name: JSON.parse(myStorage[key]).name,
          imageUrl: JSON.parse(myStorage[key]).imageUrl,
          quantity: JSON.parse(myStorage[key]).quantity,
          price: JSON.parse(myStorage[key]).price
        })
      }
    }
    this.props.fetchCheckedCartOut()
    stateChange()
    this.props
      .fetchedCheckout(arr)
      .then(() => this.props.history.push('/checkout'))
  }

  render() {
    const contents = this.props.contents

    return (
      <div>
        <ul>
          {contents.map(content => (
            <div key={content.id} className="cart">
              <Link key={content.id} to={`/boards/${content.id}`}>
                <img src={content.imageUrl} height="100" width="100" />
                {content.name}
              </Link>
              <CartItem content={content} />
              <button
                type="button"
                onClick={this.handleDeleteClick}
                value={content.id}
              >
                Remove from Cart
              </button>
            </div>
          ))}
        </ul>
        <div>
          <button type="button" onClick={this.handleOrderClick}>
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
