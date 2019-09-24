import React, {Component} from 'react'
import {getSingleBoard} from '../store/board'
import {connect} from 'react-redux'
import {stateChange} from './navbar'

class Single extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }
  componentDidMount() {
    const id = this.props.match.params.id
    this.props.getBoard(id)
  }
  render() {
    console.log(this.props)
    const {name, price, imageUrl, stock} = this.props.selected
    return (
      <div id="singleBoard">
        <div>
          <img src={imageUrl} height="200" width="200" className="imgrounder" />
          <h1>{name}</h1>
          <p>Price: ${price}</p>
          {stock < 10 ? <p>Stock: {stock} </p> : ' '}
        </div>
        <button className="btn" type="button" onClick={this.handleClick}>
          Add to Cart
        </button>
        <div id="add-toast">Item added to cart!</div>
      </div>
    )
  }

  handleClick() {
    event.preventDefault()
    const item = {
      id: this.props.selected.id
    }
    const itemData = {
      name: this.props.selected.name,
      imageUrl: this.props.selected.imageUrl,
      quantity: 1,
      price: this.props.selected.price,
      stock: this.props.selected.stock
    }
    if (
      window.localStorage.length === 0 ||
      window.localStorage.getItem(JSON.stringify(item)) === null
    ) {
      window.localStorage.setItem(
        JSON.stringify(item),
        JSON.stringify(itemData)
      )
    } else {
      let data = JSON.parse(window.localStorage.getItem(JSON.stringify(item)))
      data.quantity++
      data.price += itemData.price
      window.localStorage.setItem(JSON.stringify(item), JSON.stringify(data))
    }
    stateChange()
    let toast = document.getElementById('add-toast')
    toast.className = 'show'
    setTimeout(function() {
      toast.className = toast.className.replace('show', '')
    }, 3000)
  }
}

const mapDispatchToProps = dispatch => ({
  getBoard: id => dispatch(getSingleBoard(id))
})

const mapStateToProps = state => ({
  selected: state.board.selected
})

const SingleBoard = connect(mapStateToProps, mapDispatchToProps)(Single)

export default SingleBoard
