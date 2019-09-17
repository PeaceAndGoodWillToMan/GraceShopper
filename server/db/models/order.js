const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  contents: {
    type: Sequelize.ARRAY(Sequelize.JSON),
    allowNull: false,
    validate: {
      notEMpty: true
    }
  },
  totalPrice: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Order
