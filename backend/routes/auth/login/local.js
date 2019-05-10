const express  = require('express')
const router   = express.Router()
const passport = require('passport')

/*
  POST auth/login/local
  body {
    id
    password
  }
  create and send token back
*/
router.post('/', passport.authenticate('local', {
  failureRedirect: '/',
  successRedirect: '/'
}))

module.exports = router
