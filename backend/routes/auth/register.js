const express   = require('express')
const router    = express.Router()
const validator = require('validator')
const auth      = require('@auth')
const { Database } = require('@database')
const { CustomError } = require('@src/error')

/*
  POST auth/register
  body {
    id (account)
    password
    nickname
    email
    username
    gender
    age
  }
  local user registration
*/
router.post('/', function(req, res, next) {
  let { id, password, nickname, email, username, gender, age } = req.body
  // validate
  if ( !((validator.isAlphanumeric(id) && validator.isLength(id, { min: 6, max: 45 }))
    && validator.isLength(password, { min: 6, max: 100 })
    && (validator.isAlphanumeric(nickname) && validator.isLength(nickname, { min: 2, max: 45 }))
    && validator.isEmail(email)
    && (validator.isAlphanumeric(username) && validator.isLength(username, { min: 1, max: 16 }))
    && validator.isIn(gender, ['M', 'F'])
    && validator.isInt(age, { min: 0, max: 200 })) )
    return res.status(400).send({ message: 'Form validation has failed.' })
  // preprocess
  gender = (gender === 'M') ? 1
         : (gender === 'F') ? 0 : null
  age    = (age < 0)   ? 0
         : (age > 200) ? 200 : parseInt(age)
  // main
  let db = new Database()
  let exSalt // for sharing salt in other promise
  db.execute('SELECT COUNT(id) AS n FROM user WHERE account = ?', [id])
  .then(results => {
    if (results[0].n !== 0)
      throw new CustomError('DuplicatedUserIdError', 'Given id is already being used')

    return auth.generateSalt()
  })
  .then(salt => {
    exSalt = salt
    return auth.processPW(password, salt)
  })
  .then(digest => {
    return db.execute(`
    INSERT INTO user(account, password, nickname, email, name, gender, age, salt)
    VALUES(?, ?, ?, ?, ?, ?, ?, ?)`, 
    [id, digest, nickname, email, username, gender, age, exSalt])
  })
  .then(results => {
    if (results.affectedRows === 1) {
      res.status(201).send({ message: 'Registered new account successfully' })
    }
    else throw new CustomError('DatabaseError', 'Registration failed')
  })
  .catch(err => {
    if (err.name === 'DuplicatedUserIdError') {
      res.status(409).send({ message: err.message })
    }
    else if (err.name === 'DatabaseError') {
      res.status(500).send({ message: 'Registration failed, server or database error' })
    }
    else {
      console.log(err)
      res.status(400).send({ message: 'Request or internal server error' })
    }
  })
  .finally(() => db.close())
})

module.exports = router
