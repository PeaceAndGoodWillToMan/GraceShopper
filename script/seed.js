'use strict'

const {db, User, Board, Order, BoardOrder} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      firstName: 'dave',
      lastName: 'poop',
      email: 'cody@email.com',
      password: '123',
      address: '84 lexington ave'
    }),
    User.create({
      firstName: 'chazz',
      lastName: 'micheal',
      email: 'murphy@email.com',
      password: '123',
      address: '1234 dunkin ave'
    })
  ])

  // remember to add $ when rendering price
  const boards = await Promise.all([
    Board.create({
      name: 'Braille Pennyboard',
      price: 50,
      imageUrl: 'https://pbs.twimg.com/media/Doq9hLmW4AA1fp-.jpg',
      stock: 50
    }),
    Board.create({
      name: 'Braille Skateboard',
      price: 75,
      imageUrl:
        'https://brailleskateboarding.com/wp-content/uploads/2019/04/IMG_5530.jpg',
      stock: 50
    }),
    Board.create({
      name: 'Braille Longboard',
      price: 90,
      imageUrl:
        'https://www.theskateboarder.net/wp-content/uploads/2017/08/longboards-for-sale-craiglist.jpg',
      stock: 50
    }),
    Board.create({
      name: 'Walmart Pennyboard',
      price: 30,
      imageUrl:
        'https://www.thrillappeal.com/wp-content/uploads/2018/06/best-penny-boards-1200x800.jpg',
      stock: 50
    }),
    Board.create({
      name: 'Walmart Skateboard',
      price: 55,
      imageUrl:
        'https://brailleskateboarding.com/wp-content/uploads/2019/03/Blank-Complete-1.jpg',
      stock: 50
    }),
    Board.create({
      name: 'Walmart Longboard',
      price: 70,
      imageUrl:
        'https://scontent.cdninstagram.com/vp/157ad96f45ed10a1f8f784b99e8573b1/5D9DB78A/t51.2885-15/sh0.08/e35/p640x640/61405759_2300564359981913_4221066640413054526_n.jpg?_nc_ht=scontent.cdninstagram.com',
      stock: 50
    })
  ])

  const order1 = await Order.create({userId: 1})
  const bo = {
    orderId: order1.id,
    boardId: boards[3].id,
    quantity: 3,
    price: 300
  }
  const boardOrder1 = await BoardOrder.create(bo)

  console.log(`seeded ${boards.length} boards`)
  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
    const printOrder = await Order.findAll({
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
    const printBoardOrder = await BoardOrder.findAll()
    console.log(printOrder[0].dataValues)
    console.log(printBoardOrder[0].dataValues)
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
