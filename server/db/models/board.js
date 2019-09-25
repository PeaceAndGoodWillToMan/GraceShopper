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

Board.updateStock = async function(qty, boId) {
  const board = await Board.findOne({
    where: {id: boId}
  })
  const newStock = board.stock - qty
  if (newStock >= 0) {
    await board.update({
      stock: newStock
    })
  }
}

module.exports = Board
