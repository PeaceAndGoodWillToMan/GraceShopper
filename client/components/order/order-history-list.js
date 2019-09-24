import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getOrderHistory} from '../../store/order'
import BoardOrder from './boardOrder'

class List extends Component {
  // get all order-history data to generate list
  componentDidMount() {
    this.props.getData()
  }

  render() {
    return (
      <div>
        <ul className="wrappity">
          {this.props.orderHistory.map((obj, i) => (
            <div key={obj.order.id} id="item">
              <div id="orderNum">#{i + 1}. </div> Fulfilled:{' '}
              <div id="full">{String(obj.order.fulfilled)}</div>
              <ul className="history">
                {obj.boardOrders.map(bo => (
                  <BoardOrder
                    key={bo.boardId}
                    boardId={bo.boardId}
                    price={bo.price}
                    quantity={bo.quantity}
                  />
                ))}
              </ul>
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
    dispatch(getOrderHistory())
  }
})

const mapStateToProps = state => ({
  orderHistory: state.order.history
})

export default connect(mapStateToProps, mapDispatchToProps)(List)
