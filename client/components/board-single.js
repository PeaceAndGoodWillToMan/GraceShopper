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
      <div>
        <div>
          <img src={imageUrl} height="200" width="200" />
          <h1>{name}</h1>
          <p>Price: {price}</p>
          <p>Stock: {stock}</p>
        </div>
        <button type="button" onClick={this.handleClick}>
          Add to Cart
        </button>
      </div>
    )
  }

  handleClick() {
    console.log(this.props.selected.id.toString())
    event.preventDefault()
    if (window.localStorage.length === 0) {
      window.localStorage.setItem(String(this.props.selected.id), '1')
    } else if (
      window.localStorage.getItem(String(this.props.selected.id)) !== null
    ) {
      let quant = window.localStorage.getItem(String(this.props.selected.id))
      quant++
      window.localStorage.setItem(String(this.props.selected.id), String(quant))
    } else {
      window.localStorage.setItem(String(this.props.selected.id), '1')
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
