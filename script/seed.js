'use strict'

const {db} = require('../server/db')
const {User} = require('../server/db/models')
const {Board} = require('../server/db/models')

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
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/81cgazbE51L._SY741_.jpg',
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
        'https://scene7.zumiez.com/is/image/zumiez/pdp_hero/San-Clemente-Peony-39%22-Double-Drop-Longboard-Complete-_313465-front-US.jpg',
      stock: 50
    }),
    Board.create({
      name: 'Walmart Pennyboard',
      price: 30,
      imageUrl: 'https://i.ebayimg.com/images/g/nOgAAOSw4Y1cIIZq/s-l300.jpg',
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
        'https://s7d9.scene7.com/is/image/zumiez/cat_max/Landyachtz-Drop-Cat-Illuminacion-38%22-Drop-Through-Longboard-Complete-_312465.jpg',
      stock: 50
    })
  ])

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
