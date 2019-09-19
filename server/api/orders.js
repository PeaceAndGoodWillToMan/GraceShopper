const router = require('express').Router()
const {Order, BoardOrder, Board} = require('../db/models')

// get all orders
router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll()
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

// when a user clicks the logout button, this route creates a boardOrder in the database
// that has a order that is not fulfilled so when the user logs back in
router.post('/logout', async (req, res, next) => {
  try {
    const userId = req.session.passport.user
    const order = await Order.create({userId})
    const bo = {
      orderId: order.id,
      boardId: req.body.localStorage.id,
      quantity: req.body.localStorage.quantity,
      price: req.body.localStorage.price
    }
    const boardOrder = await BoardOrder.create(bo)
    res.sendStatus(201).json(boardOrder)
  } catch (err) {
    next(err)
  }
})

// router.put('/logout', async (req, res, next) => {
//   try {

//   } catch(err) {
//     next(err)
//   }
// })

// when client clicks checkout, this route creates a boardOrder for the client
// based on the clients userId. If there is no user on session, it creats a boardOrder
// with no UserID
router.post('/checkout', async (req, res, next) => {
  try {
    let order
    if (req.session.passport) {
      const userId = req.session.passport.user
      order = await Order.create({userId, fulfilled: true})
    } else {
      order = await Order.create({fulfilled: true})
    }
    const bo = {
      orderId: order.id,
      boardId: req.body.localStorage.id,
      quantity: req.body.localStorage.quantity,
      price: req.body.localStorage.price
    }
    const boardOrder = await BoardOrder.create(bo)
    res.sendStatus(201).json(boardOrder)
  } catch (err) {
    next(err)
  }
})

// when a user logs in, this route will be called to check if the user has orders in the
// database that are unfulfilled, if they do, the unfulfilled boardorder will be sent back
// to populate the cart. If not, a message is sent back
router.get('/login', async (req, res, next) => {
  try {
    const order = await Order.findAll({
      where: {
        userId: req.session.passport.user,
        fulfilled: false
      },
      include: [
        {
          model: Board,
          as: 'boards',
          required: false,
          attributes: ['id', 'name'],
          through: {
            model: BoardOrder,
            as: 'boardOrders',
            attributes: ['quantity']
          }
        }
      ]
    })
    if (order) {
      const boardOrder = await BoardOrder.findAll({
        where: {
          orderId: order[0].id
        }
      })
      res.json(boardOrder)
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
