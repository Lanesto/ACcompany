const express  = require('express')
const router   = express.Router()
const database = require('../../database/index')
const auth     = require('../../auth/index')
const error    = require('../../src/error')

/*
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
  db.execute('SELECT salt FROM user WHERE id = ?', [id])
    .then(results => {
      if (!results || results.length != 1)
        throw new error.CustomError('InvalidUserError', 'Cannot find stored salt')

      return auth.processPW(password, results[0].salt)
    }).then(digest => {
      return db.execute('SELECT COUNT(id) FROM user WHERE id = ? AND password = ?', [id, digest])      
    }).then(results => {
      if (!results || results.length != 1)
        throw new error.CustomError('InvalidUserError', 'Cannot find stored refresh token')

      exTokens = {
        accessToken: auth.createAccessToken({
          id,
        }),
        refreshToken: auth.createRefreshToken({
          id
        })
      }
      return db.execute('UPDATE user SET refresh_token = ? WHERE id = ?', [exTokens.refreshToken, id])
    }).then(results => {
      res.status(200).json({
        message: 'Logged in successfully',
        ...exTokens
      })
    }).catch(err => {
      if (err.name === 'InvalidUserError') {
        res.status(401).send({ message: 'Given user informations are invalid' })
      }
      console.log(err)
      // next(err)
    }).finally(() => {
      db.close()
    })
  delete db
})

module.exports = router
