const db = require('../')
const User = require('./user')
const Order = require('./order')
const Board = require('./board')
const BoardOrder = require('./boardOrder')

// ASSOCIATIONS
User.hasMany(Order)
Order.belongsTo(User)

module.exports = {
  db,
  User,
  Order,
  Board,
  BoardOrder
}
