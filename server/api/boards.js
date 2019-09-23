const router = require('express').Router()
const {Board} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    // if (req.user) {
    //   if (req.user.dataValues.isAdmin === false) {
    //     res.status(403).send('You do not have permission to access this.')
    //   } else {
    const boards = await Board.findAll()
    res.json(boards)
    //   }
    // } else {
    //   res.status(400).send('You do not have permission to access this.')
    // }
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    // if (req.user) {
    //   if (req.user.dataValues.isAdmin === false) {
    //     res.status(403).send('You do not have permission to access this.')
    //   } else {
    const boards = await Board.findByPk(req.params.id)
    res.json(boards)
    //   }
    // } else {
    //   res.status(400).send('You do not have permission to access this.')
    // }
  } catch (err) {
    next(err)
  }
})

module.exports = router
