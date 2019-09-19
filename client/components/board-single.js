import React, {Component} from 'react'
import {getSingleBoard} from '../store/board'
import {connect} from 'react-redux'

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
    const {name, price, imageUrl, stock} = this.props.selected
    return (
      <div id="singleBoard">
        <div>
          <img src={imageUrl} height="200" width="200" className="imgrounder" />
          <h1>{name}</h1>
          <p>Price: ${price}</p>
          {stock < 10 ? <p>Stock: {stock} </p> : ' '}
        </div>
        <button type="button" onClick={this.handleClick}>
          Add to Cart
        </button>
      </div>
    )
  }

  handleClick() {
    event.preventDefault()
    const item = {
      id: this.props.selected.id
    }
    const itemData = {
      quantity: 1,
      price: this.props.selected.price
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
