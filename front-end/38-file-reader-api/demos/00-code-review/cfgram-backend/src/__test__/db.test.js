import * as db from '../lib/db.js'

describe('db', () => {
  test('#start and #stop should not reject', () => {
    return db.start()
    .then(() => db.stop())
  })
})
