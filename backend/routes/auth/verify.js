const express  = require('express')
const router   = express.Router()
const auth     = require('@auth')

/*
  (NOT BEING USED)
  header {
    'Authorization': `Bearer ${accessToken}`
  }
  here verifies our JWT and other future external login APIs (Naver, Google, Facebook, ...)
  just checks the validity of a token, nothing else
*/
router.get('/', function(req, res, next) {
  let accessToken = req.get('Authorization').split(' ')[1]
  auth.verifyAccessToken(accessToken)
    .then(() => {
      res.status(200).send({ message: 'Given token is valid' })
    }).catch(err => {
      res.status(401).send({ message: 'Given token is invalid, possibly expired, broken or malformed' })
    })
})

module.exports = router
