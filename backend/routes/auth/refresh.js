const express  = require('express')
const router   = express.Router()
const database = require('@database')
const auth     = require('@auth')

/*
  POST auth/refresh
  header {
    'Authorization': `Bearer ${refreshToken}`
  }
  body {
    accessToken
  }
  if   valid(accessToken)
  then send it back
  else if   valid(refreshToken) and db.user(id).refresh_token == refreshToken
       then create and send new access token
       else invalid token given
*/
router.post('/', function(req, res, next) {
  let refreshToken = req.get('Authorization').split(' ')[1]
  let { accessToken } = req.body
  let db = new database.Database()
  auth.verifyAccessToken(accessToken)
  .then(() => {
    // still valid token -> send it back
    res.status(200).json({ accessToken })
  }).catch(err => {
    if (err.name === 'TokenExpiredError') {
      // token is valid but expired -> create and send new
      let exID
      auth.verifyRefreshToken(refreshToken)
        .then(decoded => {
          exID = decoded.id
          return db.execute(`
          SELECT COUNT(id) AS n 
          FROM user 
          WHERE account = ? AND refreshToken = ?`, 
          [exID, refreshToken])
        }).then(results => {
          if (results[0].n === 1)
            res.status(200).json({
              accessToken: auth.createAccessToken({ id: exID, privilege: null })
            })
        }).catch(err => {
          if (err.name === 'TokenExpiredError') {
            res.status(401).send({ message: 'Tokens are all expired, please login' })
          }
          else {
            res.status(500).send({ message: 'Invalid request, is suspected to be malformed' })
          }
        })
      }
      else {
        res.status(400).send({ message: 'Received invalid token, broken or malformed' })
      }
    }).finally(() => {
      db.close()
    })
  delete db
})

module.exports = router
