const express   = require('express')
const router    = express.Router()
const validator = require('validator')
const passport  = require('passport')

/*
  POST auth/login/local
  body {
    id
    password
  }
  create and send token back
*/
router.post('/', function(req, res, next) {
  let { id, password } = req.body
  // validate
  if (! (validator.isAlphanumeric(id) && validator.isLength(id, { min: 6, max: 45 })
      && validator.isLength(password, { min: 6, max: 100 })))
    return res.status(400).send({ message: 'Invalid form validation' })
  next()
}, passport.authenticate('local', {
  failureRedirect: '/',
  successRedirect: '/'
}))

module.exports = router
