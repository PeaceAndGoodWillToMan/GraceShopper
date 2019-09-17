const Sequelize = require('sequelize')
const db = require('../db')

const Board = db.define('board', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue:
      'https://ourcryptojournal.com/wp-content/uploads/2019/03/Skateboard-Market.jpg'
  },
  stock: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  style: {
    type: Sequelize.STRING
  }
})

module.exports = Board
