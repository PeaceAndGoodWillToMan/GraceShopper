import React, {Component} from 'react'
import {connect} from 'react-redux'
import {gotContents} from '../store/cart'
import {getAllBoards} from '../store'
import ListItem from './board-list-item'
import {Link} from 'react-router-dom'
import {compose} from '../../../../../../Library/Caches/typescript/3.5/node_modules/redux'

class Cart extends Component {
  constructor(props) {
    super(props)
    this.handleDeleteClick = this.handleDeleteClick.bind(this)
  }
  componentDidMount() {
    this.props.getCart()
    this.props.getData()
  }

  handleDeleteClick(event) {
    event.preventDefault()
    this.props.fetchDeletedBoard(event.target.value)
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.fetchNewOrder(event.target.value)
  }

  render() {
    const boards = this.props.boards
    const contents = this.props.contents
    let contentIds = []
    for (let i = 0; i < contents.length; i++) {
      contentIds.push(contents[i].id)
    }
    console.log('CONTENTIDS:', contentIds)
    const filteredContents = boards.filter(board =>
      contentIds.includes(board.id)
    )
    console.log('FILTERED CONTENTS:', filteredContents)

    return (
      <div className="cartlist">
        <ul>
          {filteredContents.map(board => (
            <div key={board.id} id="item">
              <Link key={board.id} to={`boards/${board.id}`}>
                <img src={board.imageUrl} height="100" width="100" />
                {board.name}
              </Link>
              <input
                type="number"
                min="1"
                name="qty"
                value={this.props.quantity}
              />
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
  },
  getData: () => {
    dispatch(getAllBoards())
  }
})

const mapStateToProps = state => ({
  boards: state.board.all,
  contents: state.cart.contents
})

const CartContents = connect(mapStateToProps, mapDispatchToProps)(Cart)
export default CartContents
