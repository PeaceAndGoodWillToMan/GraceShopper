import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getAllBoards} from '../store/board'
import ListItem from './board-list-item'
import {Link} from 'react-router-dom'

class List extends Component {
  // get all board data to generate list
  componentDidMount() {
    this.props.getData()
  }

  render() {
    return (
      <div>
        <ul className="wrappity">
          {this.props.boards.map(board => (
            <div key={board.id} id="item">
              <Link key={board.id} to={`boards/${board.id}`}>
                <img src={board.imageUrl} height="275" width="275" />
                <ListItem key={board.id} board={board} />
              </Link>
            </div>
          ))}
        </ul>
        <hr />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  getData: () => {
    dispatch(getAllBoards())
  }
})

const mapStateToProps = state => ({
  boards: state.board.all
})

const BoardList = connect(mapStateToProps, mapDispatchToProps)(List)

export default BoardList
