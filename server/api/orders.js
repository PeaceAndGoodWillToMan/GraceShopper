const router = require('express').Router()
const {Order, BoardOrder} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll()
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

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

router.get('/:id', async (req, res, next) => {
  try {
    const orders = await Order.findByPk(req.params.id)
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

module.exports = router
