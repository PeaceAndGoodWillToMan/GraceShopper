const router = require('express').Router()
const {Order, BoardOrder, Board} = require('../db/models')

// get all orders
router.get('/', async (req, res, next) => {
  try {
    res.json(await Order.findAll())
  } catch (err) {
    next(err)
  }
})

// when a user clicks the logout button, this route creates a boardOrder in the database
// that has a order that is not fulfilled so when the user logs back in
// router.post('/logout', async (req, res, next) => {
//   try {
//     const userId = req.session.passport.user;
//     await Order.logout(userId, req.body);
//     res.sendStatus(201)
//   } catch (err) {
//     next(err)
//   }
// })

// when a user logs in, this route will be called to check if the user has orders in the
// database that are unfulfilled, if they do, the unfulfilled boardorder will be sent back
// to populate the cart. If not, a message is sent back
router.get('/login', async (req, res, next) => {
  try {
    const order = await Order.findAll({
      where: {
        userId: req.session.passport.user,
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
      res.json({boardOrder, boards})
    } else {
      res.send('no orders for this user')
    }
  } catch (err) {
    next(err)
  }
})

// get order by id
router.get('/:id', async (req, res, next) => {
  try {
    const orders = await Order.findByPk(req.params.id)
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

module.exports = router
