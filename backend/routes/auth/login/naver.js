const express  = require('express')
const router   = express.Router()
const passport = require('passport')

/*
  GET auth/login/naver
*/
router.get('/', passport.authenticate('naver'))

/*
  GET auth/login/naver/callback
*/
router.get('/callback', 
  passport.authenticate('naver', {
    failureRedirect: '/auth/login/exit',
    successRedirect: '/auth/login/exit'
  })
)

module.exports = router
