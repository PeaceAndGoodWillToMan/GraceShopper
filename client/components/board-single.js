import React, {Component} from 'react'
import {getSingleBoard} from '../store/board'
import {connect} from 'react-redux'

class Single extends Component {
  componentDidMount() {
    const id = this.props.match.params.id
    this.props.getBoard(id)
  }
  render() {
    const {name, price, imageUrl, stock} = this.props.selected
    return (
      <div>
        <img src={imageUrl} height="200" width="200" />
        <h1>{name}</h1>
        <p>Price: {price}</p>
        <p>Stock: {stock}</p>
      </div>
    )
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
