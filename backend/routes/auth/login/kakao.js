const express  = require('express')
const router   = express.Router()
const passport = require('passport')

/*
  GET auth/login/kakao
*/
router.get('/', passport.authenticate('kakao'))

/*
  GET auth/login/kakao/callback
*/
router.get('/callback', 
  passport.authenticate('kakao', {
    failureRedirect: '/auth/login/exit',
    successRedirect: '/auth/login/exit'
  })
)

module.exports = router
