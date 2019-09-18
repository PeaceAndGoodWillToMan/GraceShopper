const db = require('../')
const User = require('./user')
const Order = require('./order')

// ASSOCIATIONS
User.hasMany(Order)
Order.belongsTo(User)

module.exports = {
  db,
  User,
  Order
}
