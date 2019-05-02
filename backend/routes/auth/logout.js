const express  = require('express')
const router   = express.Router()
const database = require('@database')
const auth     = require('@auth')
const error    = require('@src/error')

/*
  POST auth/logout
  header {
    'Authorization': `Bearer ${accessToken}`
  }
  delete refresh token from db
*/
router.post('/', function(req, res, next) {
  let accessToken = req.get('Authorization').split(' ')[1]
  let db = new database.Database()
  auth.verifyAccessToken(accessToken)
  .then(decoded => {
    return db.execute('UPDATE user SET refreshToken = null WHERE account = ?', [decoded.id])
  })
  .then(results => {
    if (results.affectedRows === 1)
      res.status(200).send({ message: 'Logged out successfully' })
    else throw new error.CustomError('DatabaseError', 'Cannot update user information')
  }).catch(err => {
    if (err.name === 'TokenExpiredError') next(err)
    else if (err.name === 'DatabaseError') {
      res.status(500).send({ message: err.message })
    }
    else {
      res.status(400).send({ message: 'Invalid request or header' })
    }
  }).finally(() => {
    db.close()
  })
  delete db
})

module.exports = router
