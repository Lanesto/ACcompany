const express  = require('express')
const router   = express.Router()
const database = require('@database')
const auth     = require('@auth')
const error    = require('@src/error')

/*
  POST auth/login
  body {
    id
    password
  }
  create and send token back
*/
router.post('/', function(req, res, next) {
  let { id, password } = req.body
  let db = new database.Database()
  let exTokens
  db.execute('SELECT salt FROM user WHERE account = ?', [id])
  .then(results => {
    if (!results || results.length != 1)
      throw new error.CustomError('InvalidUserError', 'User informations are broken, or malformed')

    return auth.processPW(password, results[0].salt)
  }).then(digest => {
    return db.execute(`
    SELECT COUNT(id) AS n
    FROM user
    WHERE account = ? AND password = ?`, 
    [id, digest])
  }).then(results => {
    if (results[0].n !== 1)
      throw new error.CustomError('InvalidUserError', 'User informations are broken, or malformed')

    exTokens = {
      accessToken: auth.createAccessToken({ id, privilege: null }),
      refreshToken: auth.createRefreshToken({ id })
    }
    return db.execute(`
    UPDATE user 
    SET refreshToken = ?
    WHERE account = ?`, 
    [exTokens.refreshToken, id])
  }).then(results => {
    if (results.affectedRows === 1) {
      res.status(200).json({ ...exTokens })
    }
    else throw new error.CustomError('DatabaseError', 'Record modification failure, unknown database malfunction')
  }).catch(err => {
    if (err.name === 'InvalidUserError') {
      res.status(401).send({ message: 'Given user informations are invalid' })
    }
    else if (err.name === 'DatabaseError') {
      res.status(500).send({ message: err.message })
    }
    else {
      res.status(400).send({ message: 'Request error suspected to be invalid format of request' })
    }
  }).finally(() => {
    db.close()
  })
  delete db
})

module.exports = router
