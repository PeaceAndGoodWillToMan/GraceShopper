const router = require('express').Router()
const {Order} = require('../db/models')

// when client clicks checkout, this route creates a boardOrder for the client
// based on the clients userId. If there is no user on session, it creats a boardOrder
// with no UserID
router.post('/checkout', async (req, res, next) => {
  try {
    let order
    if (req.session.passport) {
      const userId = req.session.passport.user
      Order.destroy({
        where: {
          fulfilled: false
        }
      })
      order = await Order.create({userId, fulfilled: true})
    } else {
      order = await Order.create({fulfilled: true})
    }
    const data = await order.checkout(req.body)
    res.json(data)
  } catch (err) {
    next(err)
  }
})

// when a user clicks the logout button, this route creates a boardOrder in the database
// that has a order that is not fulfilled so when the user logs back in
router.post('/logout', async (req, res, next) => {
  try {
    const userId = req.session.passport.user
    await Order.logout(userId, req.body)
    res.sendStatus(201)
  } catch (err) {
    next(err)
  }
})

module.exports = router
