const Sequelize = require('sequelize')
const BoardOrder = require('./boardOrder')
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

Order.prototype.checkout = function(boardOrders) {
  let boardOrder = []
  for (let i = 0; i < boardOrders.length; i++) {
    const bo = {
      orderId: this.id,
      boardId: boardOrders[i].id,
      quantity: boardOrders[i].quantity,
      price: boardOrders[i].price
    }
    boardOrder.push(BoardOrder.create(bo))
  }
  return boardOrder
}

module.exports = Order
