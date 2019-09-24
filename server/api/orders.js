const router = require('express').Router()
const {Order, BoardOrder} = require('../db/models')

// get all orders by user id for the orders history page
router.get('/history', async (req, res, next) => {
  try {
    res.json(
      await Order.findAll({
        where: {
          userId: req.session.passport.user
        }
      })
    )
  } catch (err) {
    next(err)
  }
})

router.get('/history/:id', async (req, res, next) => {
  try {
    res.json(
      await BoardOrder.findAll({
        where: {
          orderId: req.params.id
        }
      })
    )
  } catch (err) {
    next(err)
  }
})

// when a user logs in, this route will be called to check if the user has orders in the
// database that are unfulfilled, if they do, the unfulfilled boardorder will be sent back
// to populate the cart. If not, a message is sent back
router.get('/login', async (req, res, next) => {
  try {
    res.send(await Order.login(req.session.passport.user))
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
