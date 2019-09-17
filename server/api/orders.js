const router = require('express').Router()
const { Order } = require('../db/models')


router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const orders = await Order.findById(req.params.id);
    res.json(orders);
  } catch (err) {
    next(err);
  }
});




module.exports = router;