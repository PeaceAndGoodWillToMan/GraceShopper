const Sequelize = require('sequelize')
const BoardOrder = require('./boardOrder')
const Board = require('./board')
const db = require('../db')

const Order = db.define('order', {
  fulfilled: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

Order.logout = async function(userId, storage) {
  let order = await Order.findOrCreate({
    where: {
      userId,
      fulfilled: false
    },
    defaults: {
      userId
    }
  })
  order = order[0]
  const allBoardOrders = await BoardOrder.findAll({
    where: {
      orderId: order.id
    }
  })
  if (allBoardOrders.length > 0) {
    allBoardOrders.forEach(async boardOrder => {
      await boardOrder.destroy()
    })
  }
  const keys = Object.keys(storage)
  keys.forEach(async key => {
    let boardId = Number(key)
    let quantity = storage[key].quantity
    let price = storage[key].price
    const bo = {
      orderId: order.id,
      boardId,
      quantity,
      price
    }
    await BoardOrder.create(bo)
  })
}

Order.login = async function(userId) {
  const order = await Order.findAll({
    where: {
      userId,
      fulfilled: false
    }
  })
  if (order.length > 0) {
    let boardOrder = await BoardOrder.findAll({
      where: {
        orderId: order[0].id
      }
    })
    let boards = []
    for (let i = 0; i < boardOrder.length; i++) {
      boardOrder[i] = boardOrder[i].dataValues
      let board = await Board.findByPk(boardOrder[i].boardId)
      board = board.dataValues
      boards.push(board)
    }
    console.log({boardOrder, boards})
    return {boardOrder, boards}
  } else {
    return 'no orders for this user'
  }
}

Order.prototype.checkout = async function(boardOrders) {
  let boardOrder = []
  for (let i = 0; i < boardOrders.length; i++) {
    const bo = {
      orderId: this.id,
      boardId: boardOrders[i].id,
      quantity: boardOrders[i].quantity,
      price: boardOrders[i].price
    }
    boardOrder.push(await BoardOrder.create(bo))
  }
  return boardOrder
}

module.exports = Order
