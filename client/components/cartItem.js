import React, {Component} from 'react'

const myStorage = window.localStorage

class CartItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: this.props.content.quantity,
      price: this.props.content.price
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(evt) {
    event.preventDefault()
    const singleBoardPrice =
      this.props.content.price / this.props.content.quantity
    this.setState({
      quantity: evt.target.value,
      price: singleBoardPrice * evt.target.value
    })
    let temp = JSON.parse(
      myStorage.getItem(JSON.stringify({id: this.props.content.id}))
    )
    let newVal = JSON.stringify({
      ...temp,
      quantity: evt.target.value,
      price: singleBoardPrice * evt.target.value
    })
    let key = JSON.stringify({id: this.props.content.id})
    myStorage.setItem(key, newVal)
  }

  render() {
    return (
      <div>
        <label htmlFor="qty">Qty: </label>
        <input
          type="number"
          min="1"
          name="quantity"
          value={this.state.quantity}
          id="qty"
          onChange={this.handleChange}
        />
        <p>Price: {this.state.price}</p>
      </div>
    )
  }
}

export default CartItem
