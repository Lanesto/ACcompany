const express  = require('express')
const router   = express.Router()
const database = require('../../database/index')
const auth     = require('../../auth/index')
const error    = require('../../src/error')

/*
  body {
    id
    password
    email
    username
    gender
    age
  }

  user registration
*/
router.post('/', function(req, res, next) {
  let { id, password, email, username, gender, age } = req.body
  let db = new database.Database()
  let exSalt // for sharing salt in other promise
  db.execute('SELECT COUNT(id) AS n FROM user WHERE id = ?', [id])
    .then(results => {
      if (results[0].n != 0)
        throw new error.CustomError('DuplicatedUserIdError', 'Given id is already being used')

      return auth.generateSalt()
    }).then(salt => {
      exSalt = salt
      return auth.processPW(password, salt)
    }).then(digest => {
      return db.execute(`INSERT INTO user(id, password, email, username, gender, age, salt) 
                         VALUES(?, ?, ?, ?, ?, ?, ?)`, [id, digest, email, username, gender, age, exSalt])
    }).then(results => {
      if (results.affectedRows == 1)
        res.status(200).send('Registered new account successfully')
    }).catch(err => {
      if (err.name === 'DuplicatedUserIdError')
        res.status(409).send(err.message)
      else {
        res.sendStatus(409)
      }
      // next(err)
      console.log(err)
    }).finally(() => {
      db.close()
    })
  delete db
})

module.exports = router
