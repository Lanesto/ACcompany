const express  = require('express')
const router   = express.Router()
const database = require('../../database/index')
const auth     = require('../../auth/index')

/*
  header {
    'Authorization': `Bearer ${refreshToken}`
  }
  body {
    accessToken
  }
  
  if   valid(accessToken)
  then send it back
  else if   valid(refreshToken) and db.user(id).refresh_token = refreshToken
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
      let exId
      auth.verifyRefreshToken(refreshToken)
        .then(decoded => {
          exId = decoded.id
          return db.execute('SELECT COUNT(id) FROM user WHERE id = ? AND refresh_token = ?', [exId, refreshToken])
        }).then(results => {
          if (results.length == 1)
            res.status(200).json({
              accessToken: auth.createAccessToken({
                exId
              })
            })
        }).catch(err => {
          res.sendStatus(401)
          console.log(err)
          // next(err)
        }).finally(() => {
          db.close()
        })
      }
    })
  delete db
})

module.exports = router
