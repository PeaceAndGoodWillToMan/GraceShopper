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
        <div>
          <img src={imageUrl} height="200" width="200" />
          <h1>{name}</h1>
          <p>Price: {price}</p>
          <p>Stock: {stock}</p>
        </div>
      </div>
    )
  }

  handleClick() {}
}

if (!window.localStorage) {
  window.localStorage.setItem(`${this.props.selected.id}`, '1')
} else if (window.localStorage.getItem(`${this.props.selected.id}`)) {
  window.localStorage.setItem(
    `${this.props.selected.id}`,
    `${window.localStorage.getItem(String(this.props.selected.id++))}`
  )
} else {
  window.localStorage.setItem(`${this.props.selected.id}`, '1')
}

const mapDispatchToProps = dispatch => ({
  getBoard: id => dispatch(getSingleBoard(id))
})

const mapStateToProps = state => ({
  selected: state.board.selected
})

const SingleBoard = connect(mapStateToProps, mapDispatchToProps)(Single)

export default SingleBoard
