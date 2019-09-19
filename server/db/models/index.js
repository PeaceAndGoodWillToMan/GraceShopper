const db = require('../')
const User = require('./user')
const Order = require('./order')
const Board = require('./board')
const BoardOrder = require('./boardOrder')

// ASSOCIATIONS
User.hasMany(Order)
Order.belongsTo(User)

Board.belongsToMany(Order, {
  through: BoardOrder,
  as: 'orders',
  foreignKey: 'boardId',
  otherKey: 'orderId'
})
Order.belongsToMany(Board, {
  through: BoardOrder,
  as: 'boards',
  foreignKey: 'orderId',
  otherKey: 'boardId'
})

module.exports = {
  db,
  User,
  Order,
  Board,
  BoardOrder
}
