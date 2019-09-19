const Sequelize = require('sequelize')
const db = require('../db')

const BoardOrder = db.define('boardOrders', {
  boardId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  orderId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  }
})

module.exports = BoardOrder
