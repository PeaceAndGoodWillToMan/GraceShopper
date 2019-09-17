const router = require('express').Router()
const {Board} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const boards = await Board.findAll()
    res.json(boards)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    console.log(req.params)
    const boards = await Board.findByPk(req.params.id)
    res.json(boards)
  } catch (err) {
    next(err)
  }
})

module.exports = router
