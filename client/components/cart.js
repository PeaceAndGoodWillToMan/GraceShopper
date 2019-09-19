import React, {Component} from 'react'
import {connect} from 'react-redux'
import {gotContents} from '../store/cart'
import {getAllBoards} from '../store'
import {Link} from 'react-router-dom'

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
    return (
      <div className="cartlist">
        <ul>
          {/* {boards.filter(board => (board.id in contents
            <div key={content.id} id="item">
              <Link key={content.id} to={`boards/${content.id}`}>
                <img ></img>
              </Link>
            </div>

          ))} */}
          <input type="number" min="1" name="qty" value={this.props.quantity} />
          <button
            type="button"
            onClick={this.handleDeleteClick}
            value="Need to put in the variable"
          >
            Remove from Cart
          </button>
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
  boards: state.board.all
})

const CartContents = connect(mapStateToProps, mapDispatchToProps)(Cart)
export default CartContents
