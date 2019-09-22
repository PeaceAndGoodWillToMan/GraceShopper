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
    let order = await Order.findOrCreate({
      where: {
        userId,
        fulfilled: false
      },
      defaults: {
        userId
      }
    })
    order = order[0]
    const allBoardOrders = await BoardOrder.findAll({
      where: {
        orderId: order.id
      }
    })
    if (allBoardOrders.length > 0) {
      allBoardOrders.forEach(async b => {
        await b.destroy()
      })
    }
    const keys = Object.keys(req.body)
    keys.forEach(async k => {
      let boardId = Number(k)
      let quantity = req.body[k].quantity
      let price = req.body[k].price
      const bo = {
        orderId: order.id,
        boardId,
        quantity,
        price
      }
      await BoardOrder.create(bo)
    })
    res.sendStatus(201)
  } catch (err) {
    next(err)
  }
})

// router.put('/logout', async (req, res, next) => {
//   console.log('butter')
//   res.send('woooo');
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
      boardId: req.body.id,
      quantity: req.body.quantity,
      price: req.body.price
    }
    const boardOrder = await BoardOrder.create(bo)
    res.json(boardOrder)
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
        //   },
        //   include: [
        //     {
        //       model: Board,
        //       as: 'boards',
        //       required: false,
        //       attributes: ['id', 'name', 'imageUrl', 'stock', 'price'],
        //       through: {
        //         model: BoardOrder,
        //         as: 'boardOrders',
        //         attributes: ['price', 'quantity']
        //       }
        //     }
        //   ]
      }
    })
    if (order.length > 0) {
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
