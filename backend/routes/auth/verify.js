const express  = require('express')
const router   = express.Router()
const auth     = require('../../auth/index')

/*
  header {
    'Authorization': `Bearer ${accessToken}`
  }

  here verifies our JWT and other future external login APIs (Naver, Google, Facebook, ...)
*/
router.get('/', function(req, res, next) {
  let accessToken = req.get('Authorization').split(' ')[1]
  auth.verifyAccessToken(accessToken)
    .then(() => {
      res.sendStatus(200)
    }).catch(err => {
      res.sendStatus(401)
      console.log(err)
    })
})

module.exports = router
