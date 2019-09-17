const db = require('./db')

// register models
const {User, Board, Order} = require('./models')

User.hasMany(Order)
Order.belongsTo(User)

Board.belongsToMany(Order, {through: 'BoardOrders'})
Order.belongsToMany(Board, {through: 'BoardOrders'})

module.exports = {db, User, Board, Order}
